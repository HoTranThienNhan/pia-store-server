const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        var { id, name, image, type, price, countInStock, rating, description, active } = req.body;

        // Check required fields
        if (!id || !name || !image || !type || !price || !countInStock || !description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } 

        const response = await ProductService.createProduct(req.body);
        
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'User ID is required'
            });
        }

        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        // Check if product id exists
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product ID is required'
            });
        } 

        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const updateActiveMultipleProducts = async (req, res) => {
    try {
        const { productIds, isActive } = req.body;

        // Check if multiple product ids exists
        if (!productIds) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Multiple product IDs are required'
            });
        } 

        const response = await ProductService.updateActiveMultipleProducts(productIds, isActive);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getProductDetails = async (req, res) => {
    try {

        const productId = req.params.id;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product ID is required'
            });
        }

        const response = await ProductService.getProductDetails(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        // get limitProducts and page from query url
        const { limitProducts, page, sort, filter } = req.query;
        const defaultLimitProducts = 20, defaultPage = 0;
        const response = await ProductService.getAllProducts(limitProducts || defaultLimitProducts, page || defaultPage, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

module.exports = { 
    createProduct, 
    deleteProduct, 
    updateProduct, 
    updateActiveMultipleProducts,
    getProductDetails, 
    getAllProducts 
}