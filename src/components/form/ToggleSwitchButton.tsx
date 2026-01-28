import React from "react";

interface SwitchButtonProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    color?: "blue" | "gray";
}

const ToggleSwitchButton: React.FC<SwitchButtonProps> = ({
    checked,
    onChange,
    disabled = false,
    color = "blue",
}) => {
    const backgroundClass =
        color === "blue"
            ? checked
                ? "bg-brand-500"
                : "bg-gray-200 dark:bg-white/10"
            : checked
                ? "bg-gray-800 dark:bg-white/10"
                : "bg-gray-200 dark:bg-white/10";

    const knobTranslate = checked ? "translate-x-5" : "translate-x-0";

    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-colors duration-300 focus:outline-none
        ${backgroundClass} ${disabledClass}`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-300 ${knobTranslate}`}
            />
        </button>
    );
};
export default ToggleSwitchButton

