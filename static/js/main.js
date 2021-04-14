void (() => {
  const app = {
    initialize () {
      this.cacheElements();
      this.fetchArt();
      this.fetchAtelier();
      this.registerListeners();
      this.fetchFilter();
      this.updateDigitalClock();
      this.fetchPress();
    },
    cacheElements () {
      this.$artAndExhibitionsPreview = document.querySelector('.artAndExhibitionsPreview');
      this.$atelierPreview = document.querySelector('.atelierPreview');
      this.$toTopButton = document.getElementById('to-top-button');
      this.$filterCategoriesList = document.querySelector('.filter__categories__list');
      this.$filterYearsList = document.querySelector('.filter__years__list');
      this.$artExhibitionsList = document.querySelector('.art-exhibitions__list');
      this.$realTime = document.querySelectorAll('.real-time');
      this.$pressReleasesList = document.querySelector('.press-releases__list');
      this.$inThePressList = document.querySelector('.in-the-press__list');
      this.$atelierList = document.querySelector('.atelier__list');
    },
    registerListeners () {
      // listener 1: check if the user has scrolled
      document.addEventListener('scroll', (ev) => {
        const rootElement = document.documentElement;
        if (rootElement.scrollTop > 300) {
          this.$toTopButton.classList.add('to-top-button--visible');
        } else {
          this.$toTopButton.classList.remove('to-top-button--visible');
        }
      });
      // listener 2: check if to top button is clicked
      this.$toTopButton.addEventListener('click', (ev) => {
        const rootElement = document.documentElement;
        rootElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    },
    updateDigitalClock () {
      if (this.$realTime !== null) {
        setInterval(() => this.generateDigitalClock(), 1000);
      }
    },
    generateDigitalClock () {
      const date = new Date();
      const utc = 1;
      date.setHours(date.getHours() + utc + date.getTimezoneOffset() / 60);
      const newDigitalClock = `${this.toAmountOfDigits(date.getHours(), 2)}:${this.toAmountOfDigits(date.getMinutes(), 2)}`;
      this.$realTime.forEach((time) => {
        time.innerHTML = `Time in belgium ${newDigitalClock}`;
      });
    },
    toAmountOfDigits (number, amount) {
      let str = String(number);
      while (str.length < amount) {
        str = `0${str}`;
      }
      return str;
    },
    async fetchArt () {
      if (this.$artAndExhibitionsPreview !== null || this.$artExhibitionsList !== null) {
        const artApi = new ArtApi();
        const artAndExhibitions = await artApi.getArtAndExhibitions();
        if (this.$artAndExhibitionsPreview !== null) {
          this.updateArtandExhibitonsPreview(artAndExhibitions);
        }
        if (this.$artExhibitionsList !== null) {
          this.updateArtAndExhibitionsList(artAndExhibitions);
        }
      }
    },
    async fetchAtelier () {
      if (this.$atelierPreview !== null || this.$atelierList !== null) {
        const atelierApi = new AtelierApi();
        const atelier = await atelierApi.getAtelier();
        if (this.$atelierPreview !== null) {
          this.updateAtelierPreview(atelier);
        }
        if (this.$atelierList !== null) {
          this.updateAtelierList(atelier);
        }
      }
    },
    async fetchFilter () {
      if (this.$filterCategoriesList !== null) {
        const filterApi = new FilterApi();
        const filter = await filterApi.getFilter();
        const { categories } = filter[0];
        this.updateFilterCategories(categories);
        this.years = filter[0].years;
        this.updateFilterYears();
      }
    },
    async fetchPress () {
      if (this.$pressReleasesList !== null || this.$) {
        const pressApi = new PressApi();
        const pressData = await pressApi.getPressData();
        this.updatePressReleasesList(pressData);
        this.updateInThePressList(pressData);
      }
    },
    updateArtandExhibitonsPreview (artAndExhibitions) {
      const artAndExhibitionsPreviews = artAndExhibitions.filter(art => art.highlight);
      this.$artAndExhibitionsPreview.innerHTML = artAndExhibitionsPreviews.map(art => `
        <li class="showList__item">
          <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><img class="showList__img" loading="lazy" src="static/img/${art.cover}" alt="${art.title}"></a>
          <span class="showList__figcaption">${art.tags[0]} - ${art.location}</span>
          <h3 class="showList__title">${art.title}</h3>
          <p class="showList__text">${art.description}</p>
          <a class="link link--big" href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">Learn more</a>
        </li>
        `).join('');
    },
    updateAtelierPreview (atelier) {
      const atelierPreviews = atelier.filter(atelier => atelier.highlight);
      this.$atelierPreview.innerHTML = atelierPreviews.map(atelier => `
        <li class="showList__item">
          <a href="atelier-studio/visiting-mons-again/index.html"><img class="showList__img" loading="lazy" src="static/img/atelier/${atelier.image}" alt="${atelier.title}"></a>
          <span class="showList__figcaption">${atelier.subtitle}</span>
          <h3 class="showList__title">${atelier.title}</h3>
          <p class="showList__text">${atelier.description}</p>
          <a class="link link--big" href="atelier-studio/visiting-mons-again/index.html">Learn more</a>
        </li>
        `).join('');
    },
    updatePressReleasesList (pressData) {
      const pressDataReleases = pressData.filter(press => press.pressRelease);
      this.$pressReleasesList.innerHTML = pressDataReleases.map(press => `
        <li class="showList__item">
          <a href="press/my-secret-garden-valencia/index.html">
            <img class="showList__img" src="static/img/press/${press.image}" alt="${press.title}">
          </a>
          <span class="showList__figcaption">${press.subtitle}</span>
          <h3 class="showList__title">${press.title}</h3>
          <p class="showList__text">${press.description}</p>
          <a class="link link--big" href="press/my-secret-garden-valencia/index.html">${press.linkName}</a>
        </li>
        `).join('');
    },
    updateInThePressList (pressData) {
      const pressDataInThePress = pressData.filter(press => !press.pressRelease);
      this.$inThePressList.innerHTML = pressDataInThePress.map(press => `
        <li class="showList__item">
          <a href="press/my-secret-garden-valencia/index.html">
            <img loading="lazy" class="showList__img" src="static/img/press/${press.image}" alt="${press.title}">
          </a>
          <span class="showList__figcaption">${press.subtitle}</span>
          <h3 class="showList__title">${press.title}</h3>
          <p class="showList__text">${press.description}</p>
          <a class="link link--big" href="press/my-secret-garden-valencia/index.html">${press.linkName}</a>
        </li>
        `).join('');
    },
    updateAtelierList (atelierData) {
      this.$atelierList.innerHTML = atelierData.map(atelier => `
        <li class="showList__item">
          <a href="atelier-studio/visiting-mons-again/index.html">
            <img class="showList__img" src="static/img/atelier/${atelier.image}" alt="${atelier.title}">
          </a>
          <span class="showList__figcaption">${atelier.subtitle}</span>
          <h3 class="showList__title">${atelier.title}</h3>
          <p class="showList__text">${atelier.description}</p>
          <a class="link link--big" href="atelier-studio/visiting-mons-again/index.html">Learn more</a>
        </li>
        `).join('');
    },
    updateFilterCategories (categories) {
      this.$filterCategoriesList.innerHTML = categories.map(category => `
        <li class="filter__categories__list__item">
          <a class="filter__categories__list__link" data-category="${category}" href="art-and-exhibitions/index.html?category=${category}">${category}</a>
        </li>
        `).join('');
      this.$filterCategoriesListLinks = document.querySelectorAll('.filter__categories__list__link');
      this.checkCategory();
    },
    updateFilterYears () {
      this.$filterYearsList.innerHTML = this.years.map(year => `
        <li class="filter__years__list__item">
          <a href="art-and-exhibitions/index.html?category=${this.URLSearchParamsCategory()}#${year}">${year}</a>
        </li>
        `).join('');
    },
    updateArtAndExhibitionsList (artAndExhibitions) {
      let UrlSearchParamCategoryActive = this.URLSearchParamsCategory();
      if (UrlSearchParamCategoryActive === 'Public art') {
        UrlSearchParamCategoryActive = 'Installation';
      }
      if (UrlSearchParamCategoryActive !== 'Show all') {
        artAndExhibitions = artAndExhibitions.filter(art => art.tags.find(tag => tag === UrlSearchParamCategoryActive) !== undefined);
      }
      this.$artExhibitionsList.innerHTML = this.years.map((year) => {
        const artAndExhibitionsFiltered = artAndExhibitions.filter(art => art.year === year.toString());

        if (artAndExhibitionsFiltered.length === 0) {
          return '';
        }
        return `
          <li class="list__art-item">
            <span id="${year}" class="art-item__year">${year}</span>
            <ul class="art-item__list">
              ${this.updateArtAndExhibitionsListByYear(artAndExhibitionsFiltered)}
            </ul>
          </li>
         `;
      }).join('');
    },
    updateArtAndExhibitionsListByYear (artAndExhibitionsFiltered) {
      if (artAndExhibitionsFiltered.length === 0) {
        return '';
      }
      const tempStr = artAndExhibitionsFiltered.map(art => `
        <li class="art-item__container">
            <div class="art-item__description">
              <a class="description__title" href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><h2>${art.title}</h2></a>
                <h3 class="description__subtitle">${art.subtitle}</h3>
                <span class="description__location">${this.updateArtAndExhibitionsListCategories(art.tags)}${art.location === null ? '' : ` - ${art.location}`}</span>
            </div>
            
            <div class="img-list__container">
                <ul class="art-item__img-list">
                  ${this.updateArtAndExhibitionsListImages(art.images)}
                </ul>
                <div class="overlay-gradient"></div>
            </div>
        </li>
        `).join('');
      return tempStr;
    },
    updateArtAndExhibitionsListImages (images) {
      const tempStr = images.map(image => `
        <li>
          <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><img loading="lazy" src="static/img/${image}" alt="art"></a>
        </li>
        `).join('');
      return tempStr;
    },
    updateArtAndExhibitionsListCategories (categories) {
      let tempStr = categories.map(category => `
        ${category}
        `).join(' / ');
      tempStr = tempStr.slice(0, -3);
      return tempStr;
    },
    checkCategory () {
      const activeCategory = this.URLSearchParamsCategory();
      for (const category of this.$filterCategoriesListLinks) {
        if (activeCategory === category.dataset.category) {
          category.classList.add('filter__categories__list__link--active');
        }
      }
    },
    URLSearchParamsCategory () {
      const { search } = window.location;
      const params = new URLSearchParams(search);
      let urlType = params.get('category');
      if (urlType === null) {
        urlType = 'Show all';
      }
      return urlType;
    },
  };
  app.initialize();
})();
