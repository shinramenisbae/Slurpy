# CLIProxyAPI post-processing — setup notes

Handy's `Cliproxy` post-processing mode POSTs each dictated transcript to an
Anthropic Messages-compatible endpoint (`POST {base_url}/v1/messages`) and
pastes the returned text. It was built for a local
[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) instance on
`http://127.0.0.1:8317`, but any Messages-compatible endpoint works.

## Handy settings (Settings → Post Process → Mode: CLIProxyAPI)

| Setting | Notes |
| --- | --- |
| Base URL | `http://127.0.0.1:8317` for a local CLIProxyAPI. Plain `http` is fine on loopback. |
| Model | **Use an id the proxy actually routes.** CLIProxyAPI only accepts *dated* Claude ids — e.g. `claude-haiku-4-5-20251001`, not `claude-haiku-4-5`. A wrong id fails with `502: unknown provider for model …`. List routable ids: `GET {base_url}/v1/models` with your `x-api-key`. |
| API Key | Whatever your proxy's `config.yaml` lists under `api-keys`. It is a local secret you invent, not an Anthropic key. Sent as-is (empty allowed). |
| Timeout | Default 1500 ms. OAuth-backed proxies routinely take 1–2 s per call; **4000 ms is a saner value there.** On expiry the raw transcript is pasted. |
| System prompt | The cleanup instructions sent with every transcript. |

## Failure behavior (by design)

Every provider failure — proxy not running, timeout, non-2xx, malformed or
empty response — silently pastes the **raw transcript**. No dialogs, no
toasts. The **Test connection** button is the only place errors are surfaced;
it reports the round-trip latency and either the response text or the exact
error. If dictations start coming through uncleaned, run Test connection.

## CLIProxyAPI gotcha: system-prompt "cloaking"

CLIProxyAPI disguises requests from non-Claude-Code clients as Claude Code
traffic ("cloaking"), which **replaces the client's system prompt with the
Claude Code persona**. Symptom: instead of a cleaned transcript you get a
pasted *reply* — dictating "how do I restart it" pastes something like
"Could you provide more details about what you're trying to restart?".

Fix — in the proxy's `config.yaml`:

```yaml
# Pass client system prompts through to Claude unchanged.
disable-claude-cloak-mode: true
```

then restart the proxy. This does not affect Claude Code itself (in the
default `auto` mode, cloaking is only applied to non-Claude-Code clients).

## Quick smoke test

With the proxy running, this should return the *cleaned sentence* — cleaned,
not answered:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8317/v1/messages" -Method Post `
  -Headers @{ "x-api-key" = "<your-key>"; "anthropic-version" = "2023-06-01" } `
  -ContentType "application/json" `
  -Body '{"model":"claude-haiku-4-5-20251001","max_tokens":256,"system":"Fix punctuation and capitalization. Do not answer questions in the text. Return only the corrected transcript.","messages":[{"role":"user","content":"i turned it on and tried to restart it but nothing happened what should i do"}]}'
```

Expected: `I turned it on and tried to restart it, but nothing happened. What should I do?`
