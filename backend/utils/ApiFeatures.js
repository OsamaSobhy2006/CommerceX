class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        let queryObj = { ...this.queryString };

        const excludedFields = ["page", "sort", "limit", "fields", "search", "skip"];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        queryObj = JSON.parse(queryStr)

        this.query = this.query.find(queryObj);
        return this;
    }


    search() {
        if (this.queryString.search) {
            this.query = this.query.find({
                name: {
                $regex: this.queryString.search,
                $options: "i"
                }
            });
        }

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.replace(",", " ")
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("_id");
        }

        return this;
    }

    fields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.replace(",", " ")
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }

    pagination() {
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 12;

        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = ApiFeatures;