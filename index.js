vendingMarchine();

class Cryptocurrency {
    constructor(name, price, imgUrl, toByUrl){
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
        this.toByUrl = toByUrl;
    }
}

let cryptocurrencyList = [
    new Cryptocurrency("BTC", "¥2,739,870", "img/BTC.png", "https://bitflyer.com/ja-jp/ex/buysell/btc"),
    new Cryptocurrency("XRP", "¥70.80", "img/XRP.png", "https://bitflyer.com/ja-jp/ex/buysell/xrp"),
    new Cryptocurrency("ETH", "¥191,719", "img/ETH.png", "https://bitflyer.com/ja-jp/ex/buysell/eth"),
    new Cryptocurrency("MATIC", "¥109.75", "img/MATIC.png", "https://bitflyer.com/ja-jp/ex/buysell/matic"),
    new Cryptocurrency("MKR", "¥97,541.65", "img/MKR.png", "https://bitflyer.com/ja-jpex/buysell/mkr"),
    new Cryptocurrency("XYM", "¥5.47", "img/XYM.png", "https://bitflyer.com/ja-jp/ex/buysell/xym"),
    new Cryptocurrency("LINK", "¥1,121", "img/LINK.png", "https://bitflyer.com/ja-jp/ex/buysell/link"),
    new Cryptocurrency("DOT", "¥923", "img/DOT.png", "https://bitflyer.com/ja-jp/ex/buysell/dot"),
    new Cryptocurrency("XTZ", "¥217.0", "img/XTZ.png", "https://bitflyer.com/ja-jp/ex/buysell/xtz"),
    new Cryptocurrency("XLM", "¥17.303", "img/XLM.png", "https://bitflyer.com/ja-jp/ex/buysell/xlm"),
    new Cryptocurrency("XEM", "¥6.000", "img/XEM.png", "https://bitflyer.com/ja-jp/ex/buysell/xem"),
    new Cryptocurrency("BAT", "¥45.15", "img/BAT.png", "https://bitflyer.com/ja-jp/ex/buysell/bat"),
];

let defaultImg = "img/default.png";

function vendingMarchine(){
    let target = document.getElementById("target");
    target.innerHTML=`
        <div class='vh-100 d-flex justify-content-center align-items-center'>
            <div class='bg-white mx-5 my-5'>
                <div class='container d-flex row col-12'>
                    <div class='col-7 d-flex align-items-center justify-content-center'>
                        <div id='sliderShow'></div>
                    </div>
                    <div class='col-5 py-2 flex-wrap'>
                        <div id='info' class='py-2 px-1 container'></div>
                        <div id='btnList' class='px-0 container'></div>
                    </div>
                </div>
            </div>
        </div>
    `
}

class Create {
    // sliderの作成
    static createSlider(){
        let sliderShow = document.getElementById("sliderShow");
        sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
        sliderShow.innerHTML=`
            <div id='main' class='main full-width my-3' data-index='-1'>
                <img class='col-10 imgFit' src="${defaultImg}" alt="">
            </div>
            <div id='extra' class='extra full-width'>
            </div>
        `
    }
    // 名前，値段の作成
    static createInfo(object){
        let info = document.getElementById("info");
        info.innerHTML=`
            <p>Name:${object.name}</p>
            <p>Price:${object.price}</p>
        `
    }
    // ボタンの作成
    static createBtn(){
        let btn = document.getElementById("btnList");
        btn.innerHTML=`
            <div class='col-12'></div>
        `

        for(let i = 1; i <= cryptocurrencyList.length; i++) {
            btn.innerHTML +=`
                <button class='col-3 m-2 btn btn-primary'>${i}</button>
            `
        }

        for(let i = 1; i <= cryptocurrencyList.length; i++) {
            btn.querySelectorAll('.btn')[i-1].addEventListener('click', function(){
                Action.slideJump(i-1);
            })
        }

    }
}

class Action {
    static slideJump(input){
        let main = document.getElementById("main");
        let index = parseInt(main.getAttribute("data-index"));

        let currentElement = document.createElement("div");
        currentElement.classList.add("d-flex", "justify-content-center");

        if (index == -1) {
            currentElement.innerHTML +=`
                <img class='col-7 imgFit' src="${defaultImg}" alt="">
            `
        } else {
            currentElement.innerHTML +=`
                <a class='col-12 d-flex justify-content-center' href="${cryptocurrencyList[index].toByUrl}">
                    <img class='col-7 imgFit' src="${cryptocurrencyList[index].imgUrl}" alt="">
                </a>
            `
        }

        let animationType = Algoritm.getPosition(index, input);

        index = input;

        let nextElement = document.createElement("div");
        nextElement.classList.add("d-flex", "justify-content-center");
        nextElement.innerHTML=`
            <a class='col-12 d-flex justify-content-center' href="${cryptocurrencyList[index].toByUrl}">
                <img class='col-7 imgFit' src="${cryptocurrencyList[index].imgUrl}" alt="">
            </a>
        `

        Create.createInfo(cryptocurrencyList[index]);

        main.setAttribute("data-index", index.toString());

        this.animateMain(currentElement, nextElement, animationType);
    }

    static animateMain(currentElement, nextElement, animationType){
        let main = document.getElementById("main");
        let extra = document.getElementById("extra");
        
        main.innerHTML = "";
        main.append(nextElement);
        
        extra.innerHTML = "";
        extra.append(currentElement);
    
        main.classList.add("expand-animation");
        extra.classList.add("deplete-animation");
        
        let sliderShow = document.getElementById("sliderShow");

        if (animationType === "right"){
            sliderShow.innerHTML = "";
            sliderShow.append(extra);
            sliderShow.append(main);
        } else if (animationType === "left") {
            sliderShow.innerHTML = "";
            sliderShow.append(main);
            sliderShow.append(extra);
        }
    }
}

class Algoritm {
    static getPosition(index, input){
        if (index <= input) return "right";
        else return "left";
    }
}

Create.createSlider();
Create.createBtn();
