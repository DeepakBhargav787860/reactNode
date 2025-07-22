function IsEmptyOrZeroOrUndefined(value) {
  if (value === "" || value === 0 || value === undefined) {
    return true;
  } else {
    return false;
  }
}

export default IsEmptyOrZeroOrUndefined;
