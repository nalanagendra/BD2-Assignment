const express = require('express');
const { resolve } = require('path');
const hotels = require('./hotels');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.get('/hotels', (req, res) => {
  res.json({ hotels: hotels });
});

function sortHotelsOnPricingInAscending(hotelA, hotelB) {
  return hotelA.price - hotelB.price;
}

function sortHotelsOnPricingInDescending(hotelA, hotelB) {
  return hotelB.price - hotelA.price;
}

function sortHotelsOnPricing(hotels, pricing) {
  if (pricing === 'low-to-high') {
    hotels.sort(sortHotelsOnPricingInAscending);
  } else {
    hotels.sort(sortHotelsOnPricingInDescending);
  }
  return hotels;
}

function sortHotelsOnRatingInAscending(hotelA, hotelB) {
  return hotelA.rating - hotelB.rating;
}

function sortHotelsOnRatingInDescending(hotelA, hotelB) {
  return hotelB.rating - hotelA.rating;
}

function sortHotelsOnRating(hotels, rating) {
  if (rating === 'low-to-high') {
    hotels.sort(sortHotelsOnRatingInAscending);
  } else {
    hotels.sort(sortHotelsOnRatingInDescending);
  }
  return hotels;
}

function sortHotelsOnReviewsInAscending(hotelA, hotelB) {
  return hotelA.reviews - hotelB.reviews;
}

function sortHotelsOnReviewsInDescending(hotelA, hotelB) {
  return hotelB.reviews - hotelA.reviews;
}

function sortHotelsOnReviews(hotels, reviews) {
  if (reviews === 'least-to-most') {
    hotels.sort(sortHotelsOnReviewsInAscending);
  } else {
    hotels.sort(sortHotelsOnReviewsInDescending);
  }
  return hotels;
}

function sortHotelsOnReviews(hotels, reviews) {
  if (reviews === 'least-to-most') {
    hotels.sort(sortHotelsOnReviewsInAscending);
  } else {
    hotels.sort(sortHotelsOnReviewsInDescending);
  }
  return hotels;
}

function fetchHotelsOnAmenity(hotels, amenity) {
  return hotels.filter(
    (hotel) => hotel.amenity.toLowerCase() === amenity.toLowerCase()
  );
}

function fetchHotelsOnCountry(hotels, country) {
  return hotels.filter(
    (hotel) => hotel.country.toLowerCase() === country.toLowerCase()
  );
}

function fetchHotelsOnCategory(hotelsCopy, category) {
  return hotels.filter(
    (hotel) => hotel.category.toLowerCase() === category.toLowerCase()
  );
}

app.get('/hotels/sort/pricing', (req, res) => {
  let pricing = req.query.pricing;
  let hotelsCopy = hotels.slice();
  res.json({
    hotels: sortHotelsOnPricing(hotelsCopy, pricing),
  });
});

app.get('/hotels/sort/rating', (req, res) => {
  let rating = req.query.rating;
  let hotelsCopy = hotels.slice();
  res.json({
    hotels: sortHotelsOnRating(hotelsCopy, rating),
  });
});

app.get('/hotels/sort/reviews', (req, res) => {
  let reviews = req.query.reviews;
  let hotelsCopy = hotels.slice();
  res.json({
    hotels: sortHotelsOnReviews(hotelsCopy, reviews),
  });
});

app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = req.query.amenity;
  let hotelsCopy = hotels.slice();
  res.json({
    hotels: fetchHotelsOnAmenity(hotelsCopy, amenity),
  });
});

app.get('/hotels/filter/country', (req, res) => {
  let country = req.query.country;
  let hotelsCopy = hotels.slice();
  res.json({
    hotels: fetchHotelsOnCountry(hotelsCopy, country),
  });
});

app.get('/hotels/filter/category', (req, res) => {
  let category = req.query.category;
  let hotelsCopy = hotels.slice();
  res.json({
    hotels: fetchHotelsOnCategory(hotelsCopy, category),
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
