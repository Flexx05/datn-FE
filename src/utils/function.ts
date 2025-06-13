export const validatePasswordRules = (password: string) => {
  return {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};


export const getPasswordStrength = (rules: ReturnType<typeof validatePasswordRules>): "Yếu" | "Trung bình" | "Mạnh" => {
  const passed = Object.values(rules).filter(Boolean).length;
  if (passed <= 2) return "Yếu";
  if (passed === 3) return "Trung bình";
  return "Mạnh";
};
