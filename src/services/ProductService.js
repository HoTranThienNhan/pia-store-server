const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { id, name, image, type, price, countInStock, rating, description } = newProduct;

        try {
            // Check if product exists by _id
            const checkExistedProduct = await Product.findOne({
                id: id
            });

            if (checkExistedProduct != null) {
                resolve({
                    status: 'ERR',
                    message: 'Product already exists'
                });
            }

            // create new user
            const createdProduct = await Product.create({
                id,
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            });
            if (createdProduct) {
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW PRODUCT SUCCESS',
                    data: createdProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if product exists by _id
            const checkExistedProduct = await Product.findOne({
                _id: productId
            });

            if (checkExistedProduct == null) {
                resolve({
                    status: 'OK',
                    message: 'Product does not exist'
                });
            }

            // if product exists then delete product by _id
            await Product.findByIdAndDelete(productId);

            resolve({
                status: 'OK',
                message: 'DELETE PRODUCT SUCCESS'
            });

        } catch (e) {
            reject(e);
        }
    });
}

const updateProduct = (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if product exists by _id
            const checkExistedProduct = await Product.findOne({
                _id: productId
            });

            if (checkExistedProduct == null) {
                resolve({
                    status: 'OK',
                    message: 'Product does not exist'
                });
            }

            // if product exists, update new data for product by _id
            const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true });

            resolve({
                status: 'OK',
                message: 'UPDATE PRODUCT SUCCESS',
                data: updatedProduct
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getProductDetails = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check if product exists
            const checkExistedProduct = await Product.findOne({
                _id: productId
            });

            if (checkExistedProduct == null) {
                resolve({
                    status: 'OK',
                    message: 'Product does not exist'
                });
            }

            resolve({
                status: 'OK',
                message: 'GET PRODUCT SUCCESS',
                data: checkExistedProduct
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getAllProducts = (limitProducts, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {

            const totalProduct = await Product.count();

            // if filter products by key and value
            if (filter) {
                const key = filter[0];
                const value = filter[1];

                // find products by key and value, $regex means filter with relative value
                const allFilteredProducts = await Product.find({
                    [key]: { '$regex': value }
                }).limit(limitProducts).skip(page * limitProducts);

                resolve({
                    status: 'OK',
                    message: 'GET ALL PRODUCTS SUCCESS',
                    data: allFilteredProducts,
                    total: totalProduct,
                    currentPage: parseInt(page) + 1,
                    totalPage: Math.ceil(totalProduct / limitProducts)
                });
            }

            // if sort products
            if (sort) {
                const key = sort[0];
                const value = sort[1];
                // create an object contains sort key and value 
                const objectSort = {};
                objectSort[key] = value;

                const allSortedProducts = await Product.find().limit(limitProducts).skip(page * limitProducts).sort(objectSort);

                resolve({
                    status: 'OK',
                    message: 'GET ALL PRODUCTS SUCCESS',
                    data: allSortedProducts,
                    total: totalProduct,
                    currentPage: parseInt(page) + 1,
                    totalPage: Math.ceil(totalProduct / limitProducts)
                });
            }

            // get all products, with page n showing limit m products
            // limit(n) => show n products
            // skip(n) => skip first n products and show remaining products
            const allProducts = await Product.find().limit(limitProducts).skip(page * limitProducts);

            resolve({
                status: 'OK',
                message: 'GET ALL PRODUCTS SUCCESS',
                data: allProducts,
                total: totalProduct,
                currentPage: parseInt(page) + 1,
                totalPage: Math.ceil(totalProduct / limitProducts)
            });

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProductDetails,
    getAllProducts
}