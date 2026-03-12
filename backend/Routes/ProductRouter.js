const { ensureAuthenticated } = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/",ensureAuthenticated,(req,res)=>{

        // console.log(`----Logged in user detail -----`,req.user);
    res.status(200).json([

        {
            name:"Iphone 14 Pro Max",
            price: 120000,
            description:"The iPhone 14 Pro Max is the latest flagship smartphone from Apple, released in September 2022. It features a stunning 6.7-inch Super Retina XDR display, powered by the A16 Bionic chip for lightning-fast performance. The phone boasts a triple-camera system with advanced computational photography capabilities, allowing users to capture stunning photos and videos. With its sleek design, long battery life, and iOS ecosystem, the iPhone 14 Pro Max offers an exceptional user experience for tech enthusiasts and Apple fans alike."
        },
        {
            name:"Samsung Galaxy S22 Ultra",
            price: 110000,
            description:"The Samsung Galaxy S22 Ultra is a high-end smartphone released in February 2022. It features a large 6.8-inch Dynamic AMOLED display with a high refresh rate, providing an immersive viewing experience. Powered by the Exynos 2200 or Snapdragon 8 Gen 1 chipset (depending on the region), it delivers powerful performance for gaming and multitasking. The phone boasts a versatile quad-camera setup, including a 108MP main sensor, allowing users to capture stunning photos and videos. With its sleek design, long battery life, and advanced features, the Samsung Galaxy S22 Ultra is a top choice for Android enthusiasts."
        },
        {
            name:"OnePlus 10 Pro",
            price: 90000,
            description:"The OnePlus 10 Pro is a flagship smartphone released in January 2022. It features a 6.7-inch Fluid AMOLED display with a high refresh rate, providing a smooth and vibrant visual experience. Powered by the Snapdragon 8 Gen 1 chipset, it offers powerful performance for gaming and multitasking. The phone boasts a versatile triple-camera setup, including a 48MP main sensor, allowing users to capture stunning photos and videos. With its sleek design, fast charging capabilities, and OxygenOS software, the OnePlus 10 Pro is a compelling choice for Android users seeking a premium smartphone experience."    

        },
        {
            name:"Google Pixel 6 Pro",
            price: 85000,
            description:"The Google Pixel 6 Pro is a flagship smartphone released in October 2021. It features a 6.7-inch LTPO OLED display with a high refresh rate, providing a smooth and vibrant visual experience. Powered by Google's custom Tensor chip, it offers powerful performance and advanced AI capabilities. The phone boasts a versatile triple-camera setup, including a 50MP main sensor, allowing users to capture stunning photos and videos. With its sleek design, long battery life, and stock Android experience, the Google Pixel 6 Pro is a compelling choice for Android users seeking a premium smartphone experience."
        }
    ])
})

module.exports = router;