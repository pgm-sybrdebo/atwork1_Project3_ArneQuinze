function ArtApi () {
  this.getArtAndExhibitions = async () => {
    this.ART_API = 'https://www.pgm.gent/data/arnequinze/art.json';
    try {
      const response = await fetch(this.ART_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}

function AtelierApi () {
  this.getAtelier = async () => {
    this.ATELIER_API = './data/atelier.json';
    try {
      const response = await fetch(this.ATELIER_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}

function PressApi () {
  this.getPressData = async () => {
    this.PRESS_API = './data/press.json';
    try {
      const response = await fetch(this.PRESS_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}

function FilterApi () {
  const FILTER_API = './data/filter.json';
  this.getFilter = async () => {
    try {
      const response = await fetch(FILTER_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };
}
