// data/restaurants.js
// --- DATOS MULTILINGÜES DE RESTAURANTES REALES ---
// Este archivo exporta el array RESTAURANTS, con toda la información multilingüe y real de los restaurantes de la cadena La Sentadita.
// Se importa en la app principal para renderizar listados y detalles de restaurantes.

export const RESTAURANTS = [
    {
        id: 1,
        name: {
            es: "Bambero",
            en: "Bambero",
            fr: "Bambero",
            de: "Bambero",
            ru: "Бамберо"
        },
        description: {
            es: "Restaurante con una propuesta gastronómica distintiva.",
            en: "Restaurant with a distinctive gastronomic proposal.",
            fr: "Restaurant avec une proposition gastronomique distinctive.",
            de: "Restaurant mit einem unverwechselbaren gastronomischen Angebot.",
            ru: "Ресторан с уникальной гастрономической концепцией."
        },
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        style: {
            es: "Gastronomía",
            en: "Gastronomy",
            fr: "Gastronomie",
            de: "Gastronomie",
            ru: "Гастрономия"
        },
        icon: "fa-utensils",
        iconColor: "#FFD700",
        city: {
            es: "Calpe",
            en: "Calpe",
            fr: "Calpe",
            de: "Calpe",
            ru: "Кальпе"
        },
        address: {
            es: " C. la Niña, 4, 03710 Calp, Alicante",
            en: " C. la Niña, 4, 03710 Calp, Alicante",
            fr: " C. la Niña, 4, 03710 Calp, Alicante",
            de: " C. la Niña, 4, 03710 Calp, Alicante",
            ru: " C. la Niña, 4, 03710 Calp, Alicante"
        },
        menu: {
            starters: [
                {
                    name: { es: "Ensalada Mediterránea", en: "Mediterranean Salad", fr: "Salade Méditerranéenne", de: "Mittelmeersalat", ru: "Средиземноморский салат" },
                    desc: { es: "Con tomate, pepino, aceitunas y queso feta.", en: "With tomato, cucumber, olives and feta cheese.", fr: "Avec tomate, concombre, olives et feta.", de: "Mit Tomate, Gurke, Oliven und Feta.", ru: "С помидорами, огурцом, оливками и фетой." }
                }
            ],
            mains: [
                {
                    name: { es: "Paella de mariscos", en: "Seafood Paella", fr: "Paella de fruits de mer", de: "Meeresfrüchte-Paella", ru: "Паэлья с морепродуктами" },
                    desc: { es: "Arroz con mariscos frescos.", en: "Rice with fresh seafood.", fr: "Riz aux fruits de mer frais.", de: "Reis mit frischen Meeresfrüchten.", ru: "Рис со свежими морепродуктами." }
                }
            ]
        },
        gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ],
        reviews: [
            {
                stars: 5,
                text: {
                    es: "Excelente comida y ambiente.",
                    en: "Excellent food and atmosphere.",
                    fr: "Excellente nourriture et ambiance.",
                    de: "Ausgezeichnetes Essen und Ambiente.",
                    ru: "Отличная еда и атмосфера."
                }
            }
        ],
        phone: "+34633155043",
        email: "info@bambero.com",
        map: "https://maps.app.goo.gl/n8SAwywxejNgkHkAA",
        instagram: "https://www.instagram.com/bamberocalpe",
        facebook: "https://www.facebook.com/bamberocalpe",
        tiktok: "",
        whatsapp: "34633155043",
        logo: "img/bambero_logo.png"
    },
    {
        id: 2,
        name: {
            es: "Tango Fossa",
            en: "Tango Fossa",
            fr: "Tango Fossa",
            de: "Tango Fossa",
            ru: "Танго Фосса"
        },
        description: {
            es: "Ubicado en la Playa de la Fossa, ofrece una experiencia culinaria única.",
            en: "Located on La Fossa Beach, it offers a unique culinary experience.",
            fr: "Situé sur la plage de la Fossa, il offre une expérience culinaire unique.",
            de: "An der Playa de la Fossa gelegen, bietet es ein einzigartiges kulinarisches Erlebnis.",
            ru: "Расположен на пляже Ла Фосса, предлагает уникальный кулинарный опыт."
        },
        img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
        style: {
            es: "Cocina Mediterránea",
            en: "Mediterranean Cuisine",
            fr: "Cuisine Méditerranéenne",
            de: "Mediterrane Küche",
            ru: "Средиземноморская кухня"
        },
        icon: "fa-fish",
        iconColor: "#00BFFF",
        city: {
            es: "Calpe",
            en: "Calpe",
            fr: "Calpe",
            de: "Calpe",
            ru: "Кальпе"
        },
        address: {
            es: "Av. Juan Carlos I, 38, 03710 Calp, Alicante",
            en: "Av. Juan Carlos I, 38, 03710 Calp, Alicante",
            fr: "Av. Juan Carlos I, 38, 03710 Calp, Alicante",
            de: "Av. Juan Carlos I, 38, 03710 Calp, Alicante",
            ru: "Av. Juan Carlos I, 38, 03710 Calp, Alicante"
        },
        menu: {
            starters: [
                {
                    name: { es: "Bruschetta", en: "Bruschetta", fr: "Bruschetta", de: "Bruschetta", ru: "Брускетта" },
                    desc: { es: "Con tomate, albahaca y mozzarella.", en: "With tomato, basil and mozzarella.", fr: "Avec tomate, basilic et mozzarella.", de: "Mit Tomate, Basilikum und Mozzarella.", ru: "С помидорами, базиликом и моцареллой." }
                }
            ],
            mains: [
                {
                    name: { es: "Paella Valenciana", en: "Valencian Paella", fr: "Paella Valenciana", de: "Valencianische Paella", ru: "Валенсийская паэлья" },
                    desc: { es: "Arroz con pollo, conejo y verduras.", en: "Rice with chicken, rabbit and vegetables.", fr: "Riz avec poulet, lapin et légumes.", de: "Reis mit Hähnchen, Kaninchen und Gemüse.", ru: "Рис с курицей, кроликом и овощами." }
                }
            ]
        },
        gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ],
        reviews: [
            {
                stars: 4,
                text: {
                    es: "Buena comida, servicio mejorable.",
                    en: "Good food, service could be better.",
                    fr: "Bonne nourriture, le service pourrait être amélioré.",
                    de: "Gutes Essen, der Service könnte besser sein.",
                    ru: "Хорошая еда, сервис можно улучшить."
                }
            }
        ],
        phone: "965831671",
        email: "info@tangofossa.com",
        map: "https://maps.app.goo.gl/SzFUTUTu1dQhXKycA",
        instagram: "https://www.instagram.com/tangocalpe",
        facebook: "https://www.facebook.com/tangocalpe/?view_public_for=109952569046288",
        tiktok: "",
        whatsapp: "34600111223",
        logo: "img/tangofossa_logo.png"
    },
    {
        id: 3,
        name: {
            es: "Tango Arenal",
            en: "Tango Arenal",
            fr: "Tango Arenal",
            de: "Tango Arenal",
            ru: "Танго Арена"
        },
        description: {
            es: "Situado en la Playa del Arenal, combina buena comida con vistas al mar.",
            en: "Located on Arenal Beach, it combines good food with sea views.",
            fr: "Situé sur la plage de l'Arenal, il combine bonne nourriture et vue sur la mer.",
            de: "An der Playa del Arenal gelegen, kombiniert es gutes Essen mit Meerblick.",
            ru: "Расположен на пляже Арена, сочетает в себе хорошую еду и вид на море."
        },
        img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
        style: {
            es: "Cocina Internacional",
            en: "International Cuisine",
            fr: "Cuisine Internationale",
            de: "Internationale Küche",
            ru: "Международная кухня"
        },
        icon: "fa-globe-europe",
        iconColor: "#32CD32",
        city: {
            es: "Calpe",
            en: "Calpe",
            fr: "Calpe",
            de: "Calpe",
            ru: "Кальпе"
        },
        address: {
            es: "Edificio nuevo costa blanca lado b Arenal, C. la Niña, 6, 03710 Calp, Alicante",
            en: "Edificio nuevo costa blanca lado b Arenal, C. la Niña, 6, 03710 Calp, Alicante",
            fr: "Edificio nuevo costa blanca lado b Arenal, C. la Niña, 6, 03710 Calp, Alicante",
            de: "Edificio nuevo costa blanca lado b Arenal, C. la Niña, 6, 03710 Calp, Alicante",
            ru: "Edificio nuevo costa blanca lado b Arenal, C. la Niña, 6, 03710 Calp, Alicante"
        },
        menu: {
            starters: [
                {
                    name: { es: "Gazpacho", en: "Gazpacho", fr: "Gazpacho", de: "Gazpacho", ru: "Гаспачо" },
                    desc: { es: "Sopa fría de tomate y verduras.", en: "Cold soup of tomato and vegetables.", fr: "Soupe froide de tomate et légumes.", de: "Kaltes Tomaten-Gemüsesuppe.", ru: "Холодный суп из помидоров и овощей." }
                }
            ],
            mains: [
                {
                    name: { es: "Fideuà", en: "Fideuà", fr: "Fideuà", de: "Fideuà", ru: "Фидеуа" },
                    desc: { es: "Similar a la paella, pero con fideos.", en: "Similar to paella, but with noodles.", fr: "Semblable à la paella, mais avec des nouilles.", de: "Ähnlich wie Paella, aber mit Nudeln.", ru: "Похоже на паэлью, но с лапшой." }
                }
            ]
        },
        gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ],
        reviews: [
            {
                stars: 3,
                text: {
                    es: "Comida rica, pero el lugar estaba lleno.",
                    en: "Food was nice, but the place was full.",
                    fr: "La nourriture était bonne, mais l'endroit était plein.",
                    de: "Essen war schön, aber der Platz war voll.",
                    ru: "Еда была хорошей, но место было полным."
                }
            }
        ],
        phone: "965831657",
        email: "info@tangoarenal.com",
        map: "https://maps.app.goo.gl/124VaXnrZdhqYn826",
        instagram: "https://www.instagram.com/tangocalpe",
        facebook: "https://www.facebook.com/tangocalpe/?view_public_for=109952569046288",
        tiktok: "",
        whatsapp: "34600111224",
        logo: "img/tangoarenal_logo.png"
    },
    {
        id: 4,
        name: {
            es: "El Chiringuito",
            en: "The Chiringuito",
            fr: "Le Chiringuito",
            de: "Die Chiringuito",
            ru: "Чирингито"
        },
        description: {
            es: "En primera línea de la Playa del Arenal, ideal para disfrutar de cócteles y platos variados.",
            en: "In the front line of Arenal Beach, ideal for enjoying cocktails and varied dishes.",
            fr: "En première ligne de la plage de l'Arenal, idéal pour déguster des cocktails et des plats variés.",
            de: "In der ersten Reihe am Playa del Arenal, ideal um Cocktails und abwechslungsreiche Gerichte zu genießen.",
            ru: "На первой линии пляжа Арена, идеально подходит для наслаждения коктейлями и разнообразными блюдами."
        },
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        style: {
            es: "Chiringuito",
            en: "Beach Bar",
            fr: "Chiringuito",
            de: "Strandbar",
            ru: "Чирингито"
        },
        icon: "fa-cocktail",
        iconColor: "#FF69B4",
        city: {
            es: "Calpe",
            en: "Calpe",
            fr: "Calpe",
            de: "Calpe",
            ru: "Кальпе"
        },
        address: {
            es: "Playa del Arenal, 10",
            en: "Arenal Beach, 10",
            fr: "Plage de l'Arenal, 10",
            de: "Playa del Arenal, 10",
            ru: "Пляж Арена, 10"
        },
        menu: {
            starters: [
                {
                    name: { es: "Calamares a la Romana", en: "Battered Squid", fr: "Calamars à la romaine", de: "Panierte Tintenfische", ru: "Кальмары в кляре" },
                    desc: { es: "Con alioli casero.", en: "With homemade alioli.", fr: "Avec alioli maison.", de: "Mit hausgemachtem Aioli.", ru: "С домашним айоли." }
                }
            ],
            mains: [
                {
                    name: { es: "Arroz a Banda", en: "Arroz a Banda", fr: "Arroz a Banda", de: "Arroz a Banda", ru: "Арроз а Банда" },
                    desc: { es: "Arroz con pescado y marisco, típico de la zona.", en: "Rice with fish and seafood, typical of the area.", fr: "Riz avec poisson et fruits de mer, typique de la région.", de: "Reis mit Fisch und Meeresfrüchten, typisch für die Region.", ru: "Рис с рыбой и морепродуктами, типичными для этого района." }
                }
            ]
        },
        gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ],
        reviews: [
            {
                stars: 4,
                text: {
                    es: "Buen ambiente y cócteles deliciosos.",
                    en: "Good atmosphere and delicious cocktails.",
                    fr: "Bonne ambiance et cocktails délicieux.",
                    de: "Gute Atmosphäre und leckere Cocktails.",
                    ru: "Хорошая атмосфера и вкусные коктейли."
                }
            }
        ],
        phone: "965830003",
        email: "info@elchiringuito.com",
        map: "https://goo.gl/maps/xxxx",
        instagram: "https://instagram.com/elchiringuito",
        facebook: "https://facebook.com/elchiringuito",
        tiktok: "",
        whatsapp: "34600111225",
        logo: "img/chiringuito_logo.png"
    },
    {
        id: 5,
        name: {
            es: "Bikini Beach",
            en: "Bikini Beach",
            fr: "Bikini Beach",
            de: "Bikini Beach",
            ru: "Бикини Бич"
        },
        description: {
            es: "Ubicado en Benidorm, ofrece una experiencia playera con buena comida y ambiente.",
            en: "Located in Benidorm, it offers a beach experience with good food and atmosphere.",
            fr: "Situé à Benidorm, il offre une expérience de plage avec bonne nourriture et ambiance.",
            de: "In Benidorm gelegen, bietet es ein Stranderlebnis mit gutem Essen und Atmosphäre.",
            ru: "Расположен в Бенидорме, предлагает пляжный опыт с хорошей едой и атмосферой."
        },
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        style: {
            es: "Beach Club",
            en: "Beach Club",
            fr: "Club de Plage",
            de: "Strandclub",
            ru: "Пляжный клуб"
        },
        icon: "fa-umbrella-beach",
        iconColor: "#FFB347",
        city: {
            es: "Benidorm",
            en: "Benidorm",
            fr: "Benidorm",
            de: "Benidorm",
            ru: "Бенидорм"
        },
        address: {
            es: "Av. Madrid, 22",
            en: "Av. Madrid, 22",
            fr: "Av. Madrid, 22",
            de: "Av. Madrid, 22",
            ru: "Av. Madrid, 22"
        },
        menu: {
            starters: [
                {
                    name: { es: "Nachos con Queso", en: "Cheese Nachos", fr: "Nachos au fromage", de: "Nachos mit Käse", ru: "Начос с сыром" },
                    desc: { es: "Con jalapeños y guacamole.", en: "With jalapeños and guacamole.", fr: "Avec jalapeños et guacamole.", de: "Mit Jalapeños und Guacamole.", ru: "С халапеньо и гуакамоле." }
                }
            ],
            mains: [
                {
                    name: { es: "Hamburguesa Clásica", en: "Classic Burger", fr: "Burger Classique", de: "Klassischer Burger", ru: "Классический бургер" },
                    desc: { es: "Con carne de res, lechuga, tomate y cebolla.", en: "With beef, lettuce, tomato and onion.", fr: "Avec boeuf, laitue, tomate et oignon.", de: "Mit Rindfleisch, Salat, Tomate und Zwiebel.", ru: "С говядиной, салатом, помидорами и луком." }
                }
            ]
        },
        gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ],
        reviews: [
            {
                stars: 5,
                text: {
                    es: "El mejor lugar para relajarse en la playa.",
                    en: "The best place to relax on the beach.",
                    fr: "Le meilleur endroit pour se détendre sur la plage.",
                    de: "Der beste Ort, um sich am Strand zu entspannen.",
                    ru: "Лучшее место, чтобы расслабиться на пляже."
                }
            }
        ],
        phone: "965830005",
        email: "info@bikinibeach.com",
        map: "https://goo.gl/maps/xxxx",
        instagram: "https://instagram.com/bikinibeach",
        facebook: "https://facebook.com/bikinibeach",
        tiktok: "",
        whatsapp: "34600111227",
        logo: "img/bikini_logo.png"
    },
    {
        id: 6,
        name: {
            es: "Sol Beach",
            en: "Sol Beach",
            fr: "Plage Sol",
            de: "Sonnenstrand",
            ru: "Сол Бич"
        },
        description: {
            es: "Restaurante en Benidorm que combina gastronomía y vistas al mar.",
            en: "Restaurant in Benidorm that combines gastronomy and sea views.",
            fr: "Restaurant à Benidorm qui combine gastronomie et vue sur la mer.",
            de: "Restaurant in Benidorm, das Gastronomie und Meerblick kombiniert.",
            ru: "Ресторан в Бенидорме, который сочетает в себе гастрономию и вид на море."
        },
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        style: {
            es: "Restaurante Mediterráneo",
            en: "Mediterranean Restaurant",
            fr: "Restaurant Méditerranéen",
            de: "Mediterranes Restaurant",
            ru: "Средиземноморский ресторан"
        },
        icon: "fa-sun",
        iconColor: "#FFD700",
        city: {
            es: "Benidorm",
            en: "Benidorm",
            fr: "Benidorm",
            de: "Benidorm",
            ru: "Бенидорм"
        },
        address: {
            es: "Playa de Levante, 15",
            en: "Levante Beach, 15",
            fr: "Plage de Levante, 15",
            de: "Playa de Levante, 15",
            ru: "Пляж Леванте, 15"
        },
        menu: {
            starters: [
                {
                    name: { es: "Ensalada César", en: "Caesar Salad", fr: "Salade César", de: "Caesar-Salat", ru: "Салат Цезарь" },
                    desc: { es: "Con pollo, crutones y parmesano.", en: "With chicken, croutons and parmesan.", fr: "Avec poulet, croûtons et parmesan.", de: "Mit Hähnchen, Croutons und Parmesan.", ru: "С курицей, гренками и пармезаном." }
                }
            ],
            mains: [
                {
                    name: { es: "Pescado del Día", en: "Catch of the Day", fr: "Poisson du jour", de: "Fang des Tages", ru: "Улов дня" },
                    desc: { es: "Con guarnición de verduras y patatas.", en: "With a side of vegetables and potatoes.", fr: "Avec un accompagnement de légumes et de pommes de terre.", de: "Mit einer Beilage aus Gemüse und Kartoffeln.", ru: "С гарниром из овощей и картофеля." }
                }
            ]
        },
        gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ],
        reviews: [
            {
                stars: 4,
                text: {
                    es: "Buena comida y vistas impresionantes.",
                    en: "Good food and stunning views.",
                    fr: "Bonne nourriture et vues imprenables.",
                    de: "Gutes Essen und atemberaubende Ausblicke.",
                    ru: "Хорошая еда и потрясающий вид."
                }
            }
        ],
        phone: "965830006",
        email: "info@solbeach.com",
        map: "https://goo.gl/maps/xxxx",
        instagram: "https://instagram.com/solbeach",
        facebook: "https://facebook.com/solbeach",
        tiktok: "",
        whatsapp: "34600111228",
        logo: "img/sol_logo.png"
    },
    {
        id: 7,
        name: {
            es: "The Jungle Beach Bar",
            en: "The Jungle Beach Bar",
            fr: "Le Jungle Beach Bar",
            de: "Die Jungle Beach Bar",
            ru: "Джунгли Бич Бар"
        },
        description: {
            es: "Un bar temático en Benidorm que ofrece una experiencia única.",
            en: "A themed bar in Benidorm that offers a unique experience.",
            fr: "Un bar à thème à Benidorm qui offre une expérience unique.",
            de: "Eine Themenbar in Benidorm, die ein einzigartiges Erlebnis bietet.",
            ru: "Тематика бара в Бенидорме, предлагающая уникальный опыт."
        },
        img: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
        style: {
            es: "Bar Temático",
            en: "Themed Bar",
            fr: "Bar à thème",
            de: "Themenbar",
            ru: "Тематический бар"
        },
        icon: "fa-leaf",
        iconColor: "#228B22",
        city: {
            es: "Benidorm",
            en: "Benidorm",
            fr: "Benidorm",
            de: "Benidorm",
            ru: "Бенидорм"
        },
        address: {
            es: "Av. Mediterráneo, 30",
            en: "Av. Mediterráneo, 30",
            fr: "Av. Méditerranée, 30",
            de: "Av. Mediterráneo, 30",
            ru: "Av. Средиземноморская, 30"
        },
        menu: {
            starters: [
                {
                    name: { es: "Rollitos de Primavera", en: "Spring Rolls", fr: "Rouleaux de Printemps", de: "Frühlingsrollen", ru: "Весенние роллы" },
                    desc: { es: "Con salsa agridulce.", en: "With sweet and sour sauce.", fr: "Avec sauce aigre-douce.", de: "Mit süß-saurer Sauce.", ru: "С кисло-сладким соусом." }
                }
            ],
            mains: [
                {
                    name: { es: "Pollo Teriyaki", en: "Teriyaki Chicken", fr: "Poulet Teriyaki", de: "Teriyaki-Hähnchen", ru: "Курица терияки" },
                    desc: { es: "Con arroz y verduras salteadas.", en: "With rice and stir-fried vegetables.", fr: "Avec du riz et des légumes sautés.", de: "Mit Reis und gebratenem Gemüse.", ru: "С рисом и жареными овощами." }
                }
            ]
        },
        gallery: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        ],
        reviews: [
            {
                stars: 5,
                text: {
                    es: "Una experiencia única en un lugar increíble.",
                    en: "A unique experience in an amazing place.",
                    fr: "Une expérience unique dans un endroit incroyable.",
                    de: "Ein einzigartiges Erlebnis an einem erstaunlichen Ort.",
                    ru: "Уникальный опыт в удивительном месте."
                }
            }
        ],
        phone: "965830007",
        email: "info@thejunglebeachbar.com",
        map: "https://goo.gl/maps/xxxx",
        instagram: "https://instagram.com/thejunglebeachbar",
        facebook: "https://facebook.com/thejunglebeachbar",
        tiktok: "",
        whatsapp: "34600111229",
        logo: "img/thejungle_logo.png"
    }
];
