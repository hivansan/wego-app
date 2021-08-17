export class MemoFetch {
  constructor(name, minutes = 10) {
    if (!MemoFetch.apis) MemoFetch.apis = {};
    if (!MemoFetch.apis[name])
      MemoFetch.apis[name] = {
        minutes,
        json: null,
        date: null,
      };
    else
      MemoFetch.apis[name] = {
        ...MemoFetch.apis[name],
        minutes:
          minutes < MemoFetch.apis[name].minutes
            ? minutes
            : MemoFetch.apis[name].minutes,
      };
    this.name = name;
  }
  async json(options) {
    const it = MemoFetch.apis[this.name];
    if (
      !it.date ||
      it.date.getTime() + it.minutes * 60000 < new Date().getTime()
    ) {
      it.date = new Date();
      it.json = fetch(this.name, options).then((res) => res.json());
    }
    return it.json;
  }
}
