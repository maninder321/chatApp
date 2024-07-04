const canRedirectToHome = (urlPath: string): boolean => {
  const restrictedPaths = ["/forgotPassword", "/login", "/signup"];

  // Check if the urlPath starts with any of the restricted paths
  for (const path of restrictedPaths) {
    if (urlPath.startsWith(path)) {
      return false; // If it does, return false
    }
  }

  // If none of the restricted paths match, return true
  return true;
};

export { canRedirectToHome };
