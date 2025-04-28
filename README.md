# NodeA1 Art API

**Overview**

The project is a RESTful API that provides access to a collection of paintings, artists, galleries, genres, and eras. Built with Node.js and Express, the API fetches data from a database hosted in Supabase, allowing users to query paintings by various attributes such as year, artist, genre, and location. The API also includes statistical endpoints that count paintings by genre and artist.

This project was developed for COMP 4513 at Mount Royal University as Assignment 1, focusing on API development, database integration, and RESTful design principles.

**Features**

Retrieve paintings, artists, galleries, and genres
Search for paintings and artists by name, country, or era
Sort paintings by title or year
Fetch paintings by specific artists, galleries, or genres
Get statistics on paintings by genre and artist
Handle error cases gracefully

**Technologies Used**

Node.js & Express – Backend framework
Supabase – PostgreSQL database hosting
Render.com – API hosting

**Design Approach**

The project contains similar queries albeit accessing the numerous tables available. Therefore, to minimize the workload, improve readability, maintainability and scalability of code, reusable functions were designed to handled such cases. More complex queries that include multiple joins and filters were handled on a case-by-case basis. Some of these (eg. counts queries) uses a function written in the SQL Editor available in Supabase.

# Art API Routes
[https://elysiana-backend.up.railway.app/api/eras](https://elysiana-backend.up.railway.app/api/eras) – Retrieves all available art eras.

[https://elysiana-backend.up.railway.app/api/galleries](https://elysiana-backend.up.railway.app/api/galleries) – Returns a list of all galleries.

[https://elysiana-backend.up.railway.app/api/galleries/30](https://elysiana-backend.up.railway.app/api/galleries/30) – Retrieves details of a gallery with ID 30.

[https://elysiana-backend.up.railway.app/api/galleries/country/Calgary](https://elysiana-backend.up.railway.app/api/galleries/country/Calgary) – Returns galleries located in Calgary.

[https://elysiana-backend.up.railway.app/api/galleries/country/fra](https://elysiana-backend.up.railway.app/api/galleries/country/fra) – Returns galleries in countries starting with "fra" (e.g., France).

[https://elysiana-backend.up.railway.app/api/artists](https://elysiana-backend.up.railway.app/api/artists) – Retrieves all artists.

[https://elysiana-backend.up.railway.app/api/artists/12](https://elysiana-backend.up.railway.app/api/artists/12) – Retrieves details of an artist with ID 12.

[https://elysiana-backend.up.railway.app/api/artists/1223423](https://elysiana-backend.up.railway.app/api/artists/1223423) – Test case for a nonexistent artist.

[https://elysiana-backend.up.railway.app/api/artists/search/ma](https://elysiana-backend.up.railway.app/api/artists/search/ma) – Searches for artists whose last name starts with "ma" (case insensitive).

[https://elysiana-backend.up.railway.app/api/artists/search/mA](https://elysiana-backend.up.railway.app/api/artists/search/mA) – Case variation test for searching "mA".

[https://elysiana-backend.up.railway.app/api/artists/country/fra](https://elysiana-backend.up.railway.app/api/artists/country/fra) – Retrieves artists from countries starting with "fra".

[https://elysiana-backend.up.railway.app/api/paintings](https://elysiana-backend.up.railway.app/api/paintings) – Retrieves all paintings.

[https://elysiana-backend.up.railway.app/api/paintings/sort/year](https://elysiana-backend.up.railway.app/api/paintings/sort/year) – Retrieves paintings sorted by year.

[https://elysiana-backend.up.railway.app/api/paintings/63](https://elysiana-backend.up.railway.app/api/paintings/63) – Retrieves details of a painting with ID 63.

[https://elysiana-backend.up.railway.app/api/paintings/search/port](https://elysiana-backend.up.railway.app/api/paintings/search/port) – Searches for paintings with "port" in the title (case insensitive).

[https://elysiana-backend.up.railway.app/api/paintings/search/pORt](https://elysiana-backend.up.railway.app/api/paintings/search/pORt) – Case variation test for searching "pORt".

[https://elysiana-backend.up.railway.app/api/paintings/search/connolly](https://elysiana-backend.up.railway.app/api/paintings/search/connolly) – Error Test Case: Searches for paintings with "connolly" in the title.

[https://elysiana-backend.up.railway.app/api/paintings/years/1800/1850](https://elysiana-backend.up.railway.app/api/paintings/years/1800/1850) – Retrieves paintings created between 1800 and 1850.

[https://elysiana-backend.up.railway.app/api/paintings/galleries/5](https://elysiana-backend.up.railway.app/api/paintings/galleries/5) – Retrieves paintings from gallery ID 5.

[https://elysiana-backend.up.railway.app/api/paintings/artist/16](https://elysiana-backend.up.railway.app/api/paintings/artist/16) – Retrieves paintings by artist ID 16.

[https://elysiana-backend.up.railway.app/api/paintings/artist/666](https://elysiana-backend.up.railway.app/api/paintings/artist/666) – Test case for a nonexistent artist.

[https://elysiana-backend.up.railway.app/api/paintings/artists/country/ital](https://elysiana-backend.up.railway.app/api/paintings/artists/country/ital) – Retrieves paintings by artists from countries starting with "ital" (e.g., Italy).

[https://elysiana-backend.up.railway.app/api/genres](https://elysiana-backend.up.railway.app/api/genres) – Retrieves all painting genres.

[https://elysiana-backend.up.railway.app/api/genres/76](https://elysiana-backend.up.railway.app/api/genres/76) – Retrieves details of a genre with ID 76.

[https://elysiana-backend.up.railway.app/api/genres/painting/408](https://elysiana-backend.up.railway.app/api/genres/painting/408) – Retrieves genres associated with painting ID 408.

[https://elysiana-backend.up.railway.app/api/genres/painting/jsdfhg](https://elysiana-backend.up.railway.app/api/genres/painting/jsdfhg) – Test case for an invalid painting ID.

[https://elysiana-backend.up.railway.app/api/paintings/genre/78](https://elysiana-backend.up.railway.app/api/paintings/genre/78) – Retrieves paintings from genre ID 78.

[https://elysiana-backend.up.railway.app/api/paintings/era/2](https://elysiana-backend.up.railway.app/api/paintings/era/2) – Retrieves paintings from era ID 2.

[https://elysiana-backend.up.railway.app/api/counts/genres](https://elysiana-backend.up.railway.app/api/counts/genres) – Retrieves the number of paintings in each genre.

[https://elysiana-backend.up.railway.app/api/counts/artists](https://elysiana-backend.up.railway.app/api/counts/artists) – Retrieves the number of paintings by each artist.

[https://elysiana-backend.up.railway.app/api/counts/topgenres/20](https://elysiana-backend.up.railway.app/api/counts/topgenres/20) – Retrieves genres with more than 20 paintings.

[https://elysiana-backend.up.railway.app/api/counts/topgenres/2034958](https://elysiana-backend.up.railway.app/api/counts/topgenres/2034958) – Test case for an invalid threshold.


-----------
