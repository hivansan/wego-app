export const adminKey = () => {
  const all = Object.keys(localStorage).filter(s => s.match(/weGoAdmin(.+)/));
  return all.length === 1 ? all[0].replace('weGoAdmin', '') : null;
}

export const isAdmin = () => {
  const k = adminKey();
  return k && localStorage[`weGoAdmin${k}`] === 'true';
};
