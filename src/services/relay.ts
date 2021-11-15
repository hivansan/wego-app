let subscribers = [];

export const listen = (pred: (data: any) => boolean, handler: (data: any) => any) => {
  const sub = [pred, handler];
  subscribers.push(sub);
  return () => subscribers.indexOf(sub) > -1 && subscribers.splice(subscribers.indexOf(sub), 1);
};

export const broadcast = (data: any) => {
  console.log('RAW SOCKET MESSAGE', data);
  subscribers.forEach(([pred, handler]) => {
    try {
      pred(data) && handler(data);
    } catch (e) {
      console.error('Broadcast error', e);
    }
  })
}