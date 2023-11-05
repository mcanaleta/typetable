export type Movie = {
  id: number;
  name: string;
  releaseDate: string;
  revenue: number;
  description: string;
  rating: number;
  isFeatured: boolean;
  genre: string;
};

export type Genre = {
  id: string;
  title: string;
};

export const genres: Genre[] = [
  {
    id: "action",
    title: "Action",
  },
  {
    id: "comedy",
    title: "Comedy",
  },
  {
    id: "drama",
    title: "Drama",
  },
  {
    id: "fantasy",
    title: "Fantasy",
  },
  {
    id: "horror",
    title: "Horror",
  },
  {
    id: "romance",
    title: "Romance",
  },
  {
    id: "science-fiction",
    title: "Science Fiction",
  },
  {
    id: "thriller",
    title: "Thriller",
  },
  {
    id: "crime",
    title: "Crime",
  },
];

export const movies: Movie[] = [
  {
    id: 1,
    name: "Avatar",
    releaseDate: "2009-12-18",
    revenue: 2790439000,
    description:
      "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    rating: 7.8,
    isFeatured: true,
    genre: "science-fiction",
  },
  {
    id: 2,
    name: "Inception",
    releaseDate: "2010-07-16",
    revenue: 829895144,
    description:
      "A thief who enters the dreams of others to steal their secrets must plant an idea into a CEO's mind in order to save himself.",
    rating: 8.8,
    isFeatured: false,
    genre: "action",
  },
  {
    id: 3,
    name: "The Dark Knight",
    releaseDate: "2008-07-18",
    revenue: 1004558444,
    description:
      "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    rating: 9.0,
    isFeatured: true,
    genre: "action",
  },
  {
    id: 4,
    name: "The Shawshank Redemption",
    releaseDate: "1994-09-23",
    revenue: 58933325,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    isFeatured: true,
    genre: "drama",
  },
  {
    id: 5,
    name: "Pulp Fiction",
    releaseDate: "1994-10-14",
    revenue: 213928762,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    isFeatured: false,
    genre: "crime",
  },
  {
    id: 6,
    name: "The Godfather",
    releaseDate: "1972-03-24",
    revenue: 245066411,
    description:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    isFeatured: true,
    genre: "crime",
  },
  {
    id: 7,
    name: "Forrest Gump",
    releaseDate: "1994-07-06",
    revenue: 678226391,
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    rating: 8.8,
    isFeatured: true,
    genre: "drama",
  },
  {
    id: 8,
    name: "Fight Club",
    releaseDate: "1999-10-15",
    revenue: 100853753,
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    rating: 8.8,
    isFeatured: false,
    genre: "drama",
  },
  {
    id: 9,
    name: "The Matrix",
    releaseDate: "1999-03-31",
    revenue: 463517383,
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity.",
    rating: 8.7,
    isFeatured: true,
    genre: "science-fiction",
  },
  {
    id: 10,
    name: "The Lord of the Rings: The Return of the King",
    releaseDate: "2003-12-17",
    revenue: 1119929523,
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    rating: 8.9,
    isFeatured: true,
    genre: "fantasy",
  },
  {
    id: 11,
    name: "The Social Network",
    releaseDate: "2010-10-01",
    revenue: 224920315,
    description:
      "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
    rating: 7.7,
    isFeatured: false,
    genre: "drama",
  },
  {
    id: 12,
    name: "The Lion King",
    releaseDate: "1994-06-24",
    revenue: 968483777,
    description:
      "Lion cub and future king Simba searches for his identity. His eagerness to please others and penchant for testing his boundaries sometimes gets him into trouble.",
    rating: 8.5,
    isFeatured: true,
    genre: "animation",
  },
  {
    id: 13,
    name: "Gladiator",
    releaseDate: "2000-05-05",
    revenue: 460583960,
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    rating: 8.5,
    isFeatured: true,
    genre: "action",
  },
  {
    id: 14,
    name: "The Avengers",
    releaseDate: "2012-05-04",
    revenue: 1518812988,
    description:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    rating: 8.0,
    isFeatured: true,
    genre: "action",
  },
  {
    id: 15,
    name: "The Silence of the Lambs",
    releaseDate: "1991-02-14",
    revenue: 272753884,
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    rating: 8.6,
    isFeatured: true,
    genre: "thriller",
  },
];
