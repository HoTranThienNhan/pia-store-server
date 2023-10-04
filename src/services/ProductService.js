const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { id, name, image, type, price, countInStock, rating, description, active } = newProduct;

        try {
            // Check if product exists by id
            const getProductDataById = await Product.findOne({
                id: id
            });

            if (getProductDataById != null) {
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
                description,
                active
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
            // get product data by productId (id)
            const getProductDataById = await Product.findOne({
                id: productId
            });

            // Check if product exists by id
            if (getProductDataById == null) {
                resolve({
                    status: 'ERR',
                    message: 'Product does not exist'
                });
            } else {
                // get _id from product data
                const product_Id = getProductDataById._id;

                // if product exists then delete product by _id
                await Product.findByIdAndDelete(product_Id);

                resolve({
                    status: 'OK',
                    message: 'DELETE PRODUCT SUCCESS'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

const updateProduct = (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // get product data by productId (id)
            const getProductDataById = await Product.findOne({
                id: productId
            });

            // Check if product exists by id
            if (getProductDataById == null) {
                resolve({
                    status: 'ERR',
                    message: 'Product does not exist'
                });
            } else {
                // get _id from product data
                const product_Id = getProductDataById._id;

                // if product exists, update new data for product by _id
                const updatedProduct = await Product.findByIdAndUpdate(product_Id, data, { new: true });

                resolve({
                    status: 'OK',
                    message: 'UPDATE PRODUCT SUCCESS',
                    data: updatedProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateActiveMultipleProducts = (productIds, isActive) => {
    return new Promise(async (resolve, reject) => {
        try {
            // get product data by productId (id)
            const getMultipleProductsDataById = await Product.find({
                id: productIds
            });

            const multipleProducts_Ids = [];
            getMultipleProductsDataById.map((eachProduct) => {
                multipleProducts_Ids.push(eachProduct._id);
            });

            // if product exists, update new data for product by _id
            const updatedMultipleProducts = await Product.updateMany(
                { _id: multipleProducts_Ids },
                { $set: { active: isActive } }
            );

            resolve({
                status: 'OK',
                message: 'UPDATE ACTIVE FOR MULTIPLE PRODUCTS SUCCESS',
                data: updatedMultipleProducts
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getProductDetails = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check if product exists by productId (id)
            const getProductDataById = await Product.findOne({
                id: productId
            });

            if (getProductDataById == null || getProductDataById.active == false) {
                resolve({
                    status: 'ERR',
                    message: 'Product does not exist'
                });
            }

            resolve({
                status: 'OK',
                message: 'GET PRODUCT SUCCESS',
                data: getProductDataById
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getAllProducts = (limitProducts, page, sort, filter, onlyActive) => {
    return new Promise(async (resolve, reject) => {
        try {
            // activeValue = [true, false] means both true and false
            var activeValue = [true, false];
            var totalProduct = await Product.count();

            // activeValue = [true] means only true
            if (onlyActive === 'true') {
                activeValue = [true];
                totalProduct = await Product.find({active: activeValue}).count();
            }

            // if filter products by key and value
            if (filter) {
                const key = filter[0];
                const value = filter[1];

                // activeValue = [true] means only true
                if (onlyActive === 'true') {
                    activeValue = [true];
                }

                // find products by key and value, $regex means filter with relative value
                const allFilteredProducts = await Product.find({
                    [key]: { '$regex': value },
                    active: activeValue,
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

                // activeValue = [true] means only true
                if (onlyActive === 'true') {
                    activeValue = [true];
                }

                const allSortedProducts = await Product.find({
                    active: activeValue,
                }).limit(limitProducts).skip(page * limitProducts).sort(objectSort);

                resolve({
                    status: 'OK',
                    message: 'GET ALL PRODUCTS SUCCESS',
                    data: allSortedProducts,
                    total: totalProduct,
                    currentPage: parseInt(page) + 1,
                    totalPage: Math.ceil(totalProduct / limitProducts)
                });
            }

            // activeValue = [true] means only true
            if (onlyActive === 'true') {
                activeValue = [true];
            }

            // get all products, with page n showing limit m products
            // limit(n) => show n products
            // skip(n) => skip first n products and show remaining products
            const allProducts = await Product.find({
                active: activeValue,
            }).limit(limitProducts).skip(page * limitProducts);

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
    updateActiveMultipleProducts,
    getProductDetails,
    getAllProducts
}