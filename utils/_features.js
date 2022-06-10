class PQ {
  #obj = {};
  #pagination = {};
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.#obj.where = queryString.where ? queryString.where : null;
  }

  exec() {
    // this.select().sort().paginate();
    // this.select().sort();
    this.select();
    this.sort();
    return {
      prepared_statement: this.model.findAll(this.#obj),
      pagination: this.#pagination,
    };
  }
  sort() {
    if (this.queryString.sort) {
      this.#obj.order = this.queryString.sort
        .split(' ')
        .map((el) => [
          el.charAt(0) === '-' ? el.substring(1) : el,
          el.charAt(0) === '-' ? 'DESC' : 'ASC',
        ]);
    }
  }
  select() {
    if (this.queryString.select) {
      this.#obj.attributes = this.queryString.select.split(' ');
    }
  }
  async paginate() {
    this.#pagination.page = this.queryString.page * 1 || 1;
    this.#obj.limit = this.queryString.limit * 1 || 5;
    this.#obj.offset = (this.#pagination.page - 1) * this.#obj.limit;

    this.#pagination.total = await this.model.count();

    this.#pagination.pageCount = Math.ceil(
      this.#pagination.total / this.#obj.limit
    );
    this.#pagination.start = (this.#pagination.page - 1) * this.#obj.limit + 1;
    this.#pagination.end = this.#pagination.start + this.#obj.limit - 1;
    if (this.#pagination.end > this.#pagination.total)
      this.#pagination.end = this.#pagination.total;
    if (this.#pagination.page < this.#pagination.pageCount)
      this.#pagination.nextPage = this.#pagination.page + 1;
    if (this.#pagination.page > 1)
      this.#pagination.prevPage = this.#pagination.page - 1;

    return this;
  }
}

module.exports = PQ;
