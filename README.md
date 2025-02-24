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
[https://nodea1.onrender.com/api/eras](https://nodea1.onrender.com/api/eras) – Retrieves all available art eras.

[https://nodea1.onrender.com/api/galleries](https://nodea1.onrender.com/api/galleries) – Returns a list of all galleries.

[https://nodea1.onrender.com/api/galleries/30](https://nodea1.onrender.com/api/galleries/30) – Retrieves details of a gallery with ID 30.

[https://nodea1.onrender.com/api/galleries/country/Calgary](https://nodea1.onrender.com/api/galleries/country/Calgary) – Returns galleries located in Calgary.

[https://nodea1.onrender.com/api/galleries/country/fra](https://nodea1.onrender.com/api/galleries/country/fra) – Returns galleries in countries starting with "fra" (e.g., France).

[https://nodea1.onrender.com/api/artists](https://nodea1.onrender.com/api/artists) – Retrieves all artists.

[https://nodea1.onrender.com/api/artists/12](https://nodea1.onrender.com/api/artists/12) – Retrieves details of an artist with ID 12.

[https://nodea1.onrender.com/api/artists/1223423](https://nodea1.onrender.com/api/artists/1223423) – Test case for a nonexistent artist.

[https://nodea1.onrender.com/api/artists/search/ma](https://nodea1.onrender.com/api/artists/search/ma) – Searches for artists whose last name starts with "ma" (case insensitive).

[https://nodea1.onrender.com/api/artists/search/mA](https://nodea1.onrender.com/api/artists/search/mA) – Case variation test for searching "mA".

[https://nodea1.onrender.com/api/artists/country/fra](https://nodea1.onrender.com/api/artists/country/fra) – Retrieves artists from countries starting with "fra".

[https://nodea1.onrender.com/api/paintings](https://nodea1.onrender.com/api/paintings) – Retrieves all paintings.

[https://nodea1.onrender.com/api/paintings/sort/year](https://nodea1.onrender.com/api/paintings/sort/year) – Retrieves paintings sorted by year.

[https://nodea1.onrender.com/api/paintings/63](https://nodea1.onrender.com/api/paintings/63) – Retrieves details of a painting with ID 63.

[https://nodea1.onrender.com/api/paintings/search/port](https://nodea1.onrender.com/api/paintings/search/port) – Searches for paintings with "port" in the title (case insensitive).

[https://nodea1.onrender.com/api/paintings/search/pORt](https://nodea1.onrender.com/api/paintings/search/pORt) – Case variation test for searching "pORt".

[https://nodea1.onrender.com/api/paintings/search/connolly](https://nodea1.onrender.com/api/paintings/search/connolly) – Searches for paintings with "connolly" in the title.

[https://nodea1.onrender.com/api/paintings/years/1800/1850](https://nodea1.onrender.com/api/paintings/years/1800/1850) – Retrieves paintings created between 1800 and 1850.

[https://nodea1.onrender.com/api/paintings/galleries/5](https://nodea1.onrender.com/api/paintings/galleries/5) – Retrieves paintings from gallery ID 5.

[https://nodea1.onrender.com/api/paintings/artist/16](https://nodea1.onrender.com/api/paintings/artist/16) – Retrieves paintings by artist ID 16.

[https://nodea1.onrender.com/api/paintings/artist/666](https://nodea1.onrender.com/api/paintings/artist/666) – Test case for a nonexistent artist.

[https://nodea1.onrender.com/api/paintings/artists/country/ital](https://nodea1.onrender.com/api/paintings/artists/country/ital) – Retrieves paintings by artists from countries starting with "ital" (e.g., Italy).

[https://nodea1.onrender.com/api/genres](https://nodea1.onrender.com/api/genres) – Retrieves all painting genres.

[https://nodea1.onrender.com/api/genres/76](https://nodea1.onrender.com/api/genres/76) – Retrieves details of a genre with ID 76.

[https://nodea1.onrender.com/api/genres/painting/408](https://nodea1.onrender.com/api/genres/painting/408) – Retrieves genres associated with painting ID 408.

[https://nodea1.onrender.com/api/genres/painting/jsdfhg](https://nodea1.onrender.com/api/genres/painting/jsdfhg) – Test case for an invalid painting ID.

[https://nodea1.onrender.com/api/paintings/genre/78](https://nodea1.onrender.com/api/paintings/genre/78) – Retrieves paintings from genre ID 78.

[https://nodea1.onrender.com/api/paintings/era/2](https://nodea1.onrender.com/api/paintings/era/2) – Retrieves paintings from era ID 2.

[https://nodea1.onrender.com/api/counts/genres](https://nodea1.onrender.com/api/counts/genres) – Retrieves the number of paintings in each genre.

[https://nodea1.onrender.com/api/counts/artists](https://nodea1.onrender.com/api/counts/artists) – Retrieves the number of paintings by each artist.

[https://nodea1.onrender.com/api/counts/topgenres/20](https://nodea1.onrender.com/api/counts/topgenres/20) – Retrieves genres with more than 20 paintings.

[https://nodea1.onrender.com/api/counts/topgenres/2034958](https://nodea1.onrender.com/api/counts/topgenres/2034958) – Test case for an invalid threshold.


-----------

ARCHIVE -- IGNORE THIS
*   [http://localhost:3000/api/eras](http://localhost:3000/api/eras)
*   [http://localhost:3000/api/galleries](http://localhost:3000/api/galleries)
*   [http://localhost:3000/api/galleries/30](http://localhost:3000/api/galleries/30)
*   [http://localhost:3000/api/galleries/country/Calgary](http://localhost:3000/api/galleries/country/Calgary)
*   [http://localhost:3000/api/galleries/country/fra](http://localhost:3000/api/galleries/country/fra)
*   [http://localhost:3000/api/artists](http://localhost:3000/api/artists)
*   [http://localhost:3000/api/artists/12](http://localhost:3000/api/artists/12)
*   [http://localhost:3000/api/artists/1223423](http://localhost:3000/api/artists/1223423)
*   [http://localhost:3000/api/artists/search/ma](http://localhost:3000/api/artists/search/ma)
*   [http://localhost:3000/api/artists/search/mA](http://localhost:3000/api/artists/search/mA)
*   [http://localhost:3000/api/artists/country/fra](http://localhost:3000/api/artists/country/fra)
*   [http://localhost:3000/api/paintings](http://localhost:3000/api/paintings)
*   [http://localhost:3000/api/paintings/sort/year](http://localhost:3000/api/paintings/sort/year)
*   [http://localhost:3000/api/paintings/63](http://localhost:3000/api/paintings/63)
*   [http://localhost:3000/api/paintings/search/port](http://localhost:3000/api/paintings/search/port)
*   [http://localhost:3000/api/paintings/search/pORt](http://localhost:3000/api/paintings/search/pORt)
*   [http://localhost:3000/api/paintings/search/connolly](http://localhost:3000/api/paintings/search/connolly)
*   [http://localhost:3000/api/paintings/years/1800/1850](http://localhost:3000/api/paintings/years/1800/1850)
*   [http://localhost:3000/api/paintings/galleries/5](http://localhost:3000/api/paintings/galleries/5)
*   [http://localhost:3000/api/paintings/artist/16](http://localhost:3000/api/paintings/artist/16)
*   [http://localhost:3000/api/paintings/artist/666](http://localhost:3000/api/paintings/artist/666)
*   [http://localhost:3000/api/paintings/artists/country/ital](http://localhost:3000/api/paintings/artists/country/ital)
*   [http://localhost:3000/api/genres](http://localhost:3000/api/genres)
*   [http://localhost:3000/api/genres/76](http://localhost:3000/api/genres/76)
*   [http://localhost:3000/api/genres/painting/408](http://localhost:3000/api/genres/painting/408)
*   [http://localhost:3000/api/genres/painting/jsdfhg](http://localhost:3000/api/genres/painting/jsdfhg)
*   [http://localhost:3000/api/paintings/genre/78](http://localhost:3000/api/paintings/genre/78)
*   [http://localhost:3000/api/paintings/era/2](http://localhost:3000/api/paintings/era/2)
*   [http://localhost:3000/api/counts/genres](http://localhost:3000/api/counts/genres)
*   [http://localhost:3000/api/counts/artists](http://localhost:3000/api/counts/artists)
*   [http://localhost:3000/api/counts/topgenres/20](http://localhost:3000/api/counts/topgenres/20)
*   [http://localhost:3000/api/counts/topgenres/2034958](http://localhost:3000/api/counts/topgenres/2034958)
