    //Variaveis
    let pokemonName = document.querySelector('.pokemon_name');
    let pokemonNumber = document.querySelector('.pokemon_number');
    let pokemonImage = document.querySelector('.pokemon_image');
    const form = document.querySelector('.form');
    let input = document.querySelector('.input_search');
    const buttonPrev = document.querySelector('.btn-prev');
    const buttonNext = document.querySelector('.btn-next');

    //define id inicial
    let searchPokemon = 1;

    //linka API
    const fetchPokemon = async (pokemon) => {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        //verifica se a API está dando resposta
        if (APIResponse.status === 200){
            const data = await APIResponse.json();
            return data;
        }
        const data = await APIResponse.json();
        return data;
    };

    //Busca o pokemon do pokemon
    const renderPokemon = async (pokemon) => {

        pokemonName.innerHTML = 'Carregando...'
        pokemonName.innerHTML = ''
        const data = await fetchPokemon(pokemon);

        if(data){

            //renderiza imagem, ID e Nome do pokemon 
            pokemonImage.style.display = 'block'
            pokemonNumber.innerHTML = data.id;
            pokemonName.innerHTML = data.name;
            pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];
            input.value = '';
            searchPokemon = data.id;
        } else {
            //caso não ache o pokemon
            pokemonImage.style.display = 'none'
            pokemonName.innerHTML = 'Não encontrado:('
            pokemonNumber.innerHTML = ''
        }
        
    };

    //deixa as letras minusculas
    form.addEventListener('submit', (event) => {

        event.preventDefault(); 
        renderPokemon(input.value.toLowerCase())
        

    })

    //volta um ID
    buttonPrev.addEventListener('click', () => {
        if (searchPokemon > 1){
            searchPokemon -= 1;
            renderPokemon(searchPokemon);
        }
        
    })

    //Avança um ID
    buttonNext.addEventListener('click', () => {

        searchPokemon += 1;
        renderPokemon(searchPokemon);

    })

    renderPokemon(searchPokemon)
