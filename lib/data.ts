import bcrypt from 'bcryptjs';
const data = {
    users:[
        {
            name: 'tarek',
            email: 'admin@example.com',
            password:bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'ahmed',
            email: 'user@example.com',
            password:bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews:8,
            countInStock: 20,
            description: 'A popular Shirt',
            isFeatured:true,
            banner: '/images/banner1.jpg' 
        },
        {
            name: 'Free Shirt 2',
            slug: 'free-shirt-2',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 50,
            brand: 'Adidas',
            rating: 4.5,
            numReviews:8,
            countInStock: 20,
            description: 'A popular Shirt',
            isFeatured:true,
            banner: '/images/banner2.jpg' 
        },
        {
            name: 'Free Shirt 3',
            slug: 'free-shirt-3',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 50,
            brand: 'Zara',
            rating: 4.5,
            numReviews:8,
            countInStock: 0,
            description: 'A popular Shirt',
            isFeatured:true,
            banner: '/images/banner2.jpg' 
        },
    ],
}

export default data