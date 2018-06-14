const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')


router.get('/generate-fake-data', (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
        product.reviews = []
        //Going to add a random number of reviews, 0-2
        let numReviews = Math.floor(Math.random() * 3);
        for (let j = 0; j < numReviews; j++) {
            let review = {};
            review.username = faker.internet.userName();
            review.text = faker.lorem.sentences();
            product.reviews.push(review);
        }

        product.save((err) => {
            if (err) throw err
        })
    }
    res.end()
})

router.get('/products', (req, res, next) => {
    const perPage = 9

    // return the first page by default
    const page = req.query.page || 1

    //category is case-sensitive
    const category = req.query.category;

    const priceSort = req.query.price;
    let query;
    if (category) {
        query = Product.find({ category: category })
    } else {
        query = Product.find({})
    }

    query.skip((perPage * page) - perPage)
        .limit(perPage);

    if(priceSort == "lowest"){
        query.sort({price: "ascending"});
    }
    else if(priceSort == "highest"){
        query.sort({price: "descending"});
    }
    query.exec((err, products) => {
        if(err) {return next(err);}
        res.send(products);
    });
})

router.get('/reviews', (req, res, next) => {
    const perPage = 40

    // return the first page by default
    const page = req.query.page || 1
    //reviews to skip before finding 40
    const toSkip = (page - 1) * perPage;


    Product.find({}, function (err, products) {
        let counted = 0;
        let reviews = [];
        //Loop through products; count reviews until the count reaches toSkip, then get perPage # of reviews
        for (i = 0; i < products.length; i++) {
            if (reviews.length == perPage) {
                break;
            }
            for (j = 0; j < products[i].reviews.length; j++) {
                if (counted < toSkip) {
                    counted++;
                }
                else if (reviews.length < perPage) {
                    reviews.push(products[i].reviews[j]);
                }
                else {
                    break;
                }
            }
        }
        res.send(reviews);
    });
})

router.get("/products/:product", (req, res, next) => {
    Product.findById(req.params.product, (err, data) => {
        res.send(data);

    })
});

router.post("/products", (req, res, next) => {
    if (!req.body.category) {
        res.status(400)
            .send("Please specify a category");
    }
    if (!req.body.name) {
        res.status(400)
            .send("Please specify a product name");
    }
    if (!req.body.price) {
        res.status(400)
            .send("Please specify a price");
    }
    let product = new Product();
    product.category = req.body.category;
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save((err) => {
        if (err) throw err
        console.log("saved");
    })

    res.end();
});

router.post("/:product/reviews", (req, res, next) => {
    if (!req.body.username) {
        res.status(400)
            .send("Please specify a username");
    }
    if (!req.body.text) {
        res.status(400)
            .send("Please send a review body");
    }
    Product.findByIdAndUpdate(req.params.product, { $push: { username: req.body.username, text: req.body.text } }, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.end();
    });
})

module.exports = router