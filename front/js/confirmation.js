main ()

  async function main() {
    const articles = await getArticles()
    console.log(articles)
    displayArticles(articles)
  }

  function getArticles() {
    fetch("http://localhost:3000/api/products")
      .then(function(httpBodyResponse) {
        return httpBodyResponse.json();
      })
      .then(function(articles) {
        return articles
      })
      .catch(function(error) {
        alert(error)
      })
  }

  function displayArticles() {
    return ""
  }