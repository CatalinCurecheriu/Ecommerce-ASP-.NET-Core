const moviesData = [
    {
        id: 1,
        title: "The Matrix",
        price: 12.99,
        poster: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
        desc: "A groundbreaking sci-fi about the nature of reality.",
        category: "Sci-Fi",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8"
    },
    {
        id: 2,
        title: "Inception",
        price: 14.99,
        poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
        desc: "A mind-bending thriller that blurs dreams and reality.",
        category: "Action",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0"
    },
    {
        id: 3,
        title: "Interstellar",
        price: 15.99,
        poster: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        desc: "A visually stunning epic about humanity's survival.",
        category: "Sci-Fi",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
    },
    {
        id: 4,
        title: "Avatar",
        price: 13.99,
        poster: "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_SY679_.jpg",
        desc: "An immersive journey into the world of Pandora.",
        category: "Adventure",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=6ziBFh3V1aM"
    },
    {
        id: 5,
        title: "Star Wars: A New Hope",
        price: 14.49,
        poster: "https://image.tmdb.org/t/p/original/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        desc: "The classic space adventure that started it all.",
        category: "Sci-Fi",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=vZ734NWnAHA"
    },
    {
        id: 6,
        title: "The Dark Knight",
        price: 15.99,
        poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        desc: "A gritty and compelling tale of Gotham's hero.",
        category: "Action",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
    },
    {
        id: 7,
        title: "Avengers: Endgame",
        price: 16.99,
        poster: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        desc: "The epic conclusion to the Avengers saga.",
        category: "Action",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
    },
    {
        id: 8,
        title: "Jurassic Park",
        price: 12.99,
        poster: "https://image.tmdb.org/t/p/original/9i3plLl89DHMz7mahksDaAo7HIS.jpg",
        desc: "A thrilling adventure with dinosaurs brought back to life.",
        category: "Adventure",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=lc0UehYemQA"
    },
    {
        id: 9,
        title: "The Lion King",
        price: 11.99,
        poster: "https://image.tmdb.org/t/p/original/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
        desc: "A timeless animated masterpiece about courage and family.",
        category: "Animation",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=7TavVZMewpY"
    },
    {
        id: 10,
        title: "Frozen",
        price: 11.49,
        poster: "https://image.tmdb.org/t/p/original/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
        desc: "An enchanting tale of sisterhood and magical powers.",
        category: "Animation",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=TbQm5doF_Uc"
    },
    {
        id: 11,
        title: "Toy Story",
        price: 10.99,
        poster: "https://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
        desc: "A delightful adventure with toys that come to life.",
        category: "Animation",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=rNk1Wi8SvNc"
    },
    {
        id: 12,
        title: "Blade Runner 2049",
        price: 13.99,
        poster: "https://image.tmdb.org/t/p/original/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg",
        desc: "Visually stunning sequel about what it means to be human.",
        category: "Sci-Fi",
        availability: "Preorder",
        trailer: "https://www.youtube.com/watch?v=gCcx85zbxz4"
    },
    {
        id: 13,
        title: "Pulp Fiction",
        price: 14.99,
        poster: "https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        desc: "A groundbreaking masterpiece of non-linear storytelling.",
        category: "Crime",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY"
    },
    {
        id: 14,
        title: "The Shawshank Redemption",
        price: 13.49,
        poster: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        desc: "A powerful story of hope and friendship.",
        category: "Drama",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco"
    },
    {
        id: 15,
        title: "Forrest Gump",
        price: 13.99,
        poster: "https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        desc: "A heartwarming journey through life and history.",
        category: "Drama",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=bLvqoHBptjg"
    },
    {
        id: 16,
        title: "The Godfather",
        price: 15.99,
        poster: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        desc: "The quintessential crime saga of a mafia family.",
        category: "Crime",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=sY1S34973zA"
    },
    {
        id: 17,
        title: "Gladiator",
        price: 14.99,
        poster: "https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        desc: "An epic tale of revenge and honor in ancient Rome.",
        category: "Action",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=owK1qxDselE"
    },
    {
        id: 18,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        price: 16.99,
        poster: "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
        desc: "A legendary journey to destroy the One Ring.",
        category: "Fantasy",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4"
    },
    {
        id: 19,
        title: "The Avengers",
        price: 14.49,
        poster: "https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
        desc: "The Earth's mightiest heroes join forces to save the world.",
        category: "Action",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=eOrNdBpGMv8"
    },
    {
        id: 20,
        title: "The Truman Show",
        price: 12.99,
        poster: "https://image.tmdb.org/t/p/original/bx326cwBtDsfDcnTgFlK5dXkyaC.jpg",
        desc: "A man discovers his entire life is a TV show.",
        category: "Drama",
        availability: "In Stock",
        trailer: "https://www.youtube.com/watch?v=dlnmQbPGuls"
    }
];
export default moviesData;