const initBurgerMenu = () => {
//переменные для бургерменю
    const burgerMenu = document.querySelector('.burger__menu');
    // console.log(burgerMenu);
    const burgerMenuLink = document.querySelector('.burger__link__container');

//активация бургер мееню
    burgerMenu.addEventListener('click', () => {
        document.body.classList.toggle('_lock');
        burgerMenu.classList.toggle('_active');
        burgerMenuLink.classList.toggle('_active');
    })

    const goToLinks = document.querySelectorAll('.burger__menu__link');
    goToLinks.forEach((link) => {
        console.log(link);//a.burger__menu__link
        link.addEventListener('click', () => {
            document.body.classList.remove('_lock');
            burgerMenu.classList.remove('_active');
            burgerMenuLink.classList.remove('_active');
            link.removeAttribute('href');

            const nameLink = link.dataset.goto;//получаем класс (в виде строки)
            console.log(typeof nameLink);//string поэтому надо получаться оттуда имеено класс
            const goToBlock = document.querySelector(nameLink);
            console.log(goToBlock);//получаем div


            goToBlock.scrollIntoView({ behavior: 'smooth' })

            //способ ниже тоже работает, там можно проводить просчет, 
            //способ выше такого просчета не дает, но нам он в данном случае не нужен
            // const goToSection =  goToBlock.getBoundingClientRect().top + window.scrollY;           
        //    window.scrollTo({
        //     top: goToSection,
        //     behavior: 'smooth'
        // });

        })
    })
} 


const initCardAnimation = () => {


    

    const cards = document.querySelectorAll('.projects__card');

    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            console.log(card);
            const cardText = card.querySelector('.card__text');
            console.log(cardText);
            cardText.classList.add('_focus')
            card.addEventListener('mouseleave', () => {
            cardText.classList.remove('_focus')
            }) // Здесь вы можете выполнить любую логику с найденным элементом .card__text
        });
    });
}



// ________сетка под номер телефона
const initPhoneInputs = () => { 
const phoneInputs = document.querySelectorAll('input[data-tel-input]');
// console.log(phoneInputs);


const getInputNumbersValue = (input) => {
   return input.value.replace(/\D/g, '');
}

const onPhoneInput = (e) => {
    const input = e.target,
        selectionStart = input.selectionStart;
    let inputNumbersValue = getInputNumbersValue(input),
        formatedInputValue = '';
        console.log('inputValue', inputNumbersValue);
        

        if(!inputNumbersValue) {
            return input.value = '';
        }

        if(input.value.length != selectionStart) {
            // console.log('середина', e);
            if (e.data && /\D/g.test(e.data)){
                input.value = inputNumbersValue;
            }
            return
        }

        const country = ['7', '8', '9'].includes(inputNumbersValue[0]) ? 1 : -1;
        // console.log(country);
        if (country > 0) {
        if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;// + inputNumbersValue если убрать + inputNumbersValue - то 9 подставляться не будет
        
            let firstSymbols = (inputNumbersValue[0] === '8') ? '+7' : '+7'; //можно разрешить 8
            // console.log(firstSymbols);
            formatedInputValue = firstSymbols + ' ';
            // console.log(inputNumbersValue.length);
            if (country > 0 && inputNumbersValue.length > 1){
                // console.log('больше 1')
                formatedInputValue += ' (' + inputNumbersValue.substring(1, 4);
            

            if (inputNumbersValue.length >= 5) {
                formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }

            if (inputNumbersValue.length >= 8) {
                formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }

            if (inputNumbersValue.length >= 10) {
                formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        }}

            else 
            formatedInputValue = '+' + inputNumbersValue;
            

    input.value = formatedInputValue;
       
    
}
    const onPhoneKeyDown = (e) => {
        console.log(e.keyCode, e.target.value)
        let input = e.target;
        if(e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
            input.value = '';
        }
    }

    const onPhonePaste = (e) => {
        const pasted = e.clipboardData || window.clipboardData,
            input = e.target,
            inputNumbersValue = getInputNumbersValue(input);

        if(pasted){
            let pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }

    }

phoneInputs.forEach(input => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown)
    input.addEventListener('paste', onPhonePaste)

})
}

// конец сетки под номер телефона




window.addEventListener('load', () => {
    // console.log('WINDOW loaded!')
    initCardAnimation();
})

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM loaded');
    initBurgerMenu();
    initPhoneInputs();
})



