'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const canchas = [
      { 
        "id":"plazasport",
        "nombre":"Plaza Sports", 
        "zona":"Norte", 
        "descripcion":"Plaza deportiva con cancha profesional de césped.",
        "direccion":"Vía Principal de Sambocity.",
        "img":"https://i.postimg.cc/9FfsBbX4/01.png",
        "precio":25,
        "coordenadas": [-2.04880689082399, -79.8828233590672]
      },
      {
        "id":"fortaleza",
        "nombre":"Cancha de fútbol: La Fortaleza", 
        "zona":"Norte", 
        "descripcion":"Estadio multiusos con cancha de fútbol de césped sintético.",
        "direccion":"Avenida León Febres Cordero km 14.5.",
        "img":"https://i.postimg.cc/mZnZd590/02.png",
        "precio":15,
        "coordenadas": [-2.0518852425773155, -79.9122328479301]
      },
      {
        "id":"vertientes",
        "nombre":"Club Social y Deportivo: Las Vertientes", 
        "zona":"Norte", 
        "descripcion":"Club social y deportivo con cancha profesional de fútbol de césped sintético con luminarias.",
        "direccion":"Avenida León Febres Cordero, al lado de Plaza Madeira.",
        "img":"https://i.postimg.cc/bvc6Ypt1/03.png",
        "precio":20,
        "coordenadas": [-2.0478502028048347, -79.92028604742505]
      },
      {
        "id":"tungurahuense",
        "nombre":"Sociedad Tungurahuense de Guayaquil", 
        "zona":"Norte", 
        "descripcion":"Club social, deportivo y de beneficiencia con cancha de césped orgánico.",
        "direccion":"Vía a Daule km 14.5.",
        "img":"https://i.postimg.cc/W4dXtGgG/04.png",
        "precio":15,
        "coordenadas": [-2.0699844216399246, -79.94058596091764]
      },
      {
        "id":"rotaria",
        "nombre":"Cancha Sintética: La Rotaria", 
        "zona":"Norte", 
        "descripcion":"Cancha de césped sintético artificial con iluminarias, bar, wifi, etc.",
        "direccion":"Vía Perimetral km 23.5.",
        "img":"https://i.postimg.cc/tg0d2L8c/05.png",
        "precio":18,
        "coordenadas": [-2.0956529735715588, -79.95452454557447]
      },
      {
        "id":"citygol",
        "nombre":"Canchas City Gol", 
        "zona":"Norte", 
        "descripcion":"Campo de fútbol",
        "direccion":"Autopista Terminal Terrestre km 6.6",
        "img":"https://scontent.fgye6-1.fna.fbcdn.net/v/t1.6435-9/51730811_367706660676865_1415001027484057600_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=e3f864&_nc_eui2=AeGNyfaXO2sHmB1y6PJ59BJVjMTYUuGHVreMxNhS4YdWt_VfVXeSYjQrGrGhkuLLCxnKoxn8-O9nWsKK2-R-mfiY&_nc_ohc=9DXvvHcdCegAX8ZXpCA&_nc_ht=scontent.fgye6-1.fna&oh=dec72fa9351e12b244f65ddd03596d89&oe=60F127A0",
        "precio":20,
        "coordenadas": [-2.0805622849904024, -79.89595567447262]
  
      },
      {
        "id":"hoolligans",
        "nombre":"Hoolligans Futbol Club", 
        "zona":"Centro", 
        "descripcion":"Cancha de césped sintético con iluminarias con parqueadero.",
        "direccion":"Garzota 2, Mz41 Solar 5.",
        "img":"https://i.postimg.cc/qMrNwJN3/06.png",
        "precio":35,
        "coordenadas": [-2.142449414393168, -79.88922001858906]
      },
      {
        "id":"corner",
        "nombre":"Cancha Sintética: Corner FC", 
        "zona":"Centro", 
        "descripcion":"Cancha de césped sintético con bar de comida.",
        "direccion":"Avenida Francisco de Orellana y Agustín Freire Icaza.",
        "img":"https://i.postimg.cc/kX6yRrjZ/07.png",
        "precio":30,
        "coordenadas": [-2.147013729755208, -79.90012721673851]
      },
      {
        "id":"clasico",
        "nombre":"Cancha: El Clásico FC", 
        "zona":"Centro", 
        "descripcion":"Cancha de césped sintético con iluminarias y bien ubicado.",
        "direccion":"Ciudadela La Herradura.",
        "img":"https://i.postimg.cc/3W59JnHW/08.png",
        "precio":28,
        "coordenadas": [-2.1487889790597894, -79.89989733023116] 
      },
      {
        "id":"zonafutbol",
        "nombre":"Cancha: Zona Fútbol 5", 
        "zona":"Centro", 
        "descripcion":"Cancha de césped sintético con bar, iluminarias y parqueadero.",
        "direccion":"Atras del Restaurante La Casa del Tomahawk y Av. Francisco de Orellana.",
        "img":"https://i.postimg.cc/P54bB12b/09.png",
        "precio":25,
        "coordenadas": [-2.142327914377955, -79.90385748790275]
      },
      {
        "id":"jogo",
        "nombre":"Cancha: Jogo FC", 
        "zona":"Centro", 
        "descripcion":"Cancha de césped sintético con club social y bar.",
        "direccion":"Maria Piedad Castillo de Levi.",
        "img":"https://i.postimg.cc/KcJ9MSnr/10.png",
        "precio":40,
        "coordenadas": [-2.1540715908052164, -79.89885860694694]
      },
      {
        "id":"fertiza",
        "nombre":"Canchas La Fertiza", 
        "zona":"Sur", 
        "descripcion":"Canchas de fútbol de césped natural, tamaño reglamentario para 11 jugadores.",
        "direccion":"Arq. Andrés Efraín Alava Mestanza 111.",
        "img":"https://i.postimg.cc/przwXbbp/11.png",
        "precio":20,
        "coordenadas": [-2.258118834951404, -79.89882243010302]
      },
      {
        "id":"astillero",
        "nombre":"La Canchita del Astillero", 
        "zona":"Sur", 
        "descripcion":"Cancha de fútbol 5, sintética, con academia de fútbol hasta 20 años.",
        "direccion":"Los Esteros Y Jacinto Rodriguez de Bejarano.",
        "img":"https://i.postimg.cc/T3yL3CNn/12.png",
        "precio":15,
        "coordenadas": [-2.2448890511392547, -79.90314204742461]
      },
      {
        "id":"tarjetita",
        "nombre":"Cancha Sintética Tarjetita Intriago", 
        "zona":"Sur", 
        "descripcion":"Cancha de fútbol de hasta 8 jugadores, con iluminarias, césped sintético y alquiler de eventos.",
        "direccion":"Cooperativa Pedregal, Guasmo Norte.",
        "img":"https://i.postimg.cc/LXqH9y3G/13.png",
        "precio":18,
        "coordenadas": [-2.2601372807690434, -79.87588435278707]
      }
    ];
    for (let cancha of canchas) {
      await queryInterface.bulkInsert('Canchas', [{
        nombre: cancha.nombre,
        zona: cancha.zona,
        descripcion: cancha.descripcion,
        direccion: cancha.direccion,
        imgUrl: cancha.img,
        precio: cancha.precio,
        coordenadas: cancha.coordenadas.toString()
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
