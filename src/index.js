const { getJoker } = require("./functions/request");

exports.cloud_function =async (req, res) => {

  contentTypes = [
    "application/json",
    "application/json;charset=utf-8",
    "application/json; charset=utf-8"
  ];
  if (contentTypes.includes(req.headers["content-type"]) == false) {
    return res.status(400).send({
      status: "failed",
      message: "Incorrect content-type: " + req.headers["content-type"],
      errors: []
    });
  }
  try {
    let x = 0;
    //Array de datos resultado
    let jokers = []
    let response = {};
    //Inicio de las 15 peticiones
    while(x<15){
      let joker_body = {}
      let response = {};
      //Llama a metodo para obtencion de data
      response = await getJoker();
      //Armado Objeto para insertar al array final
      joker_body = {
        "id": response.data.id,
        "value": response.data.value,
        "url": response.data.url
      };
      //Insercion del objeto en el array final
      jokers.push(joker_body);
      x+=1;
    }
    //Armado resultado final con la cantidad de datos y array final
    data_final = {
      "Cantidad de Datos": x,
      "Datos": jokers
    }
    res.status(200).send(data_final);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.data);
  }
};