let dolar = [];

async function getData() {
    try{
        let res = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales'),
            json = await res.json();

        json.forEach(el => {
            dolar.push(el.casa)
        });

        return parseInt(dolar.find((el) => el.nombre.includes('Blue')).venta)
    }
    catch(err) {
        return 1;
    }
}


export {getData}

