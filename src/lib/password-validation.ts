export type PasswordRuleId =
  | "minLength"
  | "maxLength"
  | "lowercase"
  | "uppercase"
  | "number"
  | "special";

export type PasswordRule = {
  id: PasswordRuleId;
  label: string;
  test: (value: string) => boolean;
};

export type PasswordRulesConfig = {
  minLength: number;
  maxLength: number;
  requireLowercase: boolean;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
};

/** Default policy — change once, applies everywhere PasswordField / validatePassword is used. */
export const DEFAULT_PASSWORD_RULES: PasswordRulesConfig = {
  minLength: 8,
  maxLength: 64,
  requireLowercase: true,
  requireUppercase: true,
  requireNumber: true,
  requireSpecial: true,
};

export type PasswordCheck = {
  id: PasswordRuleId;
  label: string;
  passed: boolean;
};

export type PasswordValidationResult = {
  ok: boolean;
  checks: PasswordCheck[];
  /** Labels of failing rules (handy for toasts / server sync) */
  errors: string[];
};

const SPECIAL_RE = /[^A-Za-z0-9]/;

/**
 * Build the active rule list from config.
 *
 * HOW TO USE:
 *   getPasswordRules() // defaults
 *   getPasswordRules({ requireSpecial: false })
 */
export function getPasswordRules(
  config: Partial<PasswordRulesConfig> = {},
): PasswordRule[] {
  const c = { ...DEFAULT_PASSWORD_RULES, ...config };
  const rules: PasswordRule[] = [
    {
      id: "minLength",
      label: `At least ${c.minLength} characters`,
      test: (v) => v.length >= c.minLength,
    },
    {
      id: "maxLength",
      label: `At most ${c.maxLength} characters`,
      test: (v) => v.length > 0 && v.length <= c.maxLength,
    },
  ];

  if (c.requireLowercase) {
    rules.push({
      id: "lowercase",
      label: "One lowercase letter",
      test: (v) => /[a-z]/.test(v),
    });
  }
  if (c.requireUppercase) {
    rules.push({
      id: "uppercase",
      label: "One uppercase letter",
      test: (v) => /[A-Z]/.test(v),
    });
  }
  if (c.requireNumber) {
    rules.push({
      id: "number",
      label: "One number",
      test: (v) => /\d/.test(v),
    });
  }
  if (c.requireSpecial) {
    rules.push({
      id: "special",
      label: "One special character (!@#$…)",
      test: (v) => SPECIAL_RE.test(v),
    });
  }

  return rules;
}

/**
 * Validate a password against the shared policy.
 *
 * HOW TO USE:
 *   const { ok, checks } = validatePassword(value)
 *   if (!ok) return // block submit
 */
export function validatePassword(
  value: string,
  config: Partial<PasswordRulesConfig> = {},
): PasswordValidationResult {
  const rules = getPasswordRules(config);
  const checks = rules.map((rule) => ({
    id: rule.id,
    label: rule.label,
    passed: rule.test(value),
  }));
  const errors = checks.filter((c) => !c.passed).map((c) => c.label);
  return {
    ok: errors.length === 0 && value.length > 0,
    checks,
    errors,
  };
}

export function isPasswordValid(
  value: string,
  config: Partial<PasswordRulesConfig> = {},
): boolean {
  return validatePassword(value, config).ok;
}
