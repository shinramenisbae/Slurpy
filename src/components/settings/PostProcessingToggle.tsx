import React from "react";
import { useTranslation } from "react-i18next";
import type { PostProcessMode } from "@/bindings";
import { Dropdown, SettingContainer } from "../ui";
import { useSettings } from "../../hooks/useSettings";

interface PostProcessingToggleProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

const MODES: PostProcessMode[] = ["off", "builtin", "cliproxy"];

// Three-state post-processing mode selector (Off / Builtin / CLIProxyAPI).
// Replaces the old on/off toggle; the component name is kept so existing
// call sites (Advanced settings) stay unchanged.
export const PostProcessingToggle: React.FC<PostProcessingToggleProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const mode = getSetting("post_process_mode") ?? "off";

    return (
      <SettingContainer
        title={t("settings.postProcessing.mode.label")}
        description={t("settings.postProcessing.mode.description")}
        descriptionMode={descriptionMode}
        layout="horizontal"
        grouped={grouped}
      >
        <Dropdown
          selectedValue={mode}
          options={MODES.map((value) => ({
            value,
            label: t(`settings.postProcessing.mode.${value}`),
          }))}
          onSelect={(value) => {
            if (value) {
              updateSetting("post_process_mode", value as PostProcessMode);
            }
          }}
          disabled={isUpdating("post_process_mode")}
          className="min-w-[180px]"
        />
      </SettingContainer>
    );
  });
