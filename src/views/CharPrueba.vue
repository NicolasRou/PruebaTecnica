<template>
    <div class="home">
      <div class="container_search">
        <form @submit.prevent="SearchCharacters()" class="search-box">
            <input type="text" placeholder="¿Que personaje buscas?" v-model="search" class="search"/>
            <input type="submit" value="Search" class="submit"/>
        </form>
      </div>
        <div class="display">
            <ul class="list">
                <li v-for=" c of character" :key="c.id" class="card">
                    <div class="container-menu">
                        <div class="container" >
                            <div class="img">
                                <img :src="c.image" alt="">
                            </div>
                            <div class="name">
                                <h2>{{c.name}}</h2>
                            </div>
                            <div class="estado">
                                <h4>{{c.status}}</h4>
                            </div>
                            <div class="especie">
                                <h4>Species: {{c.species}}</h4>
                            </div>
                            <div class="genero">
                                <h4>Gender: {{c.gender}}</h4>
                            </div>
                            <div class="ubicacion">
                                <h4>Location: {{c.location.name}}</h4>
                            </div>
                            <div class="comentarios">
                                <h4>Comentarios: </h4>
                            </div>
                        </div>
                        <router-link v-bind:to="`/character/${c.id}`">
                            <button class="details"> Mas detalles</button>
                        </router-link>
                    </div>
                </li>
                <router-view/>
            </ul>
        </div>
        <div class="pagination">
            <ul class="pagination_list">
                <li v-for="page in pages" v-bind:key="page"><a @click.prevent="Pagination(page)" href="#!">{{page}}</a></li>
            </ul>
            <button @click.prevent="Pagination(page--)" class="pagination_button">Anterior</button>
            <ul>
                <li class="list_page">
                    <a>{{page}}</a>
                </li>
            </ul>
            <button @click.prevent="Pagination(page++)" class="pagination_button">Siguiente</button>
        </div>
    </div>
  </template>

<script>
import { onMounted, ref } from 'vue';

export default {
    setup () {
    const search = ref("");
    const character = ref([]);
    const page = ref(1);
    const pages = ref(0);
    const comments = ref("");
    const elements = ref([]);
    
        const CharacterView = () => {
            fetch("https://rickandmortyapi.com/api/character")
            .then(response => response.json())
            .then(data => {
                character.value = data.results;
                elements.value = data.results.map(element => (element.id));
                return {
                    elements
                }
            });
        }
        
        const SearchCharacters = () => {
            if (search.value != "") {
                fetch(`https://rickandmortyapi.com/api/character/?name=${search.value}`)
                .then(response => response.json())
                .then(data => {
                    character.value = data.results;
                })
            }
        }
        
        const Pagination = (page) => {
            fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
                .then(response => response.json())
                .then(data => {
                    character.value = data.results;
                    pages.value = data.info.pages
                })
        }   

        onMounted (()=>{
            CharacterView()
        })

        return {
            search,
            character,
            CharacterView,
            SearchCharacters,
            page,
            pages,
            Pagination,  
            elements,
            comments,
        }
    }
}
</script>

<style>
.home {
    margin: 80px 0;
}
.search {
    width: 40%;
    border: 2px solid #0b5ed7;
    border-radius: 8px;
    box-shadow: 1px 3px 9px rgb(0 0 0 / 25%);
    padding: 10px 15px;
    font-size: 1.25rem;
}
.submit {
    margin: 10px;
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
    padding: 10px 15px;
    font-size: 1.25rem;
    border-radius: 8px;
}
.submit:hover {
    background-color: #0b5ed7;
    transition: 0.4s;
    cursor: pointer;
    transform: scale(1.1);
}

.card {
    list-style: none;
    margin: 50px;
}

.list {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    justify-content: center;
}
.container {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.container-menu {
    border: 0px solid #0b5ed7;
    border-radius: 20%;
}
.img {
    max-width: 100%;
}
.img img {
    border-radius: 10%;
}
.details {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
    padding: 10px 15px;
    font-size: 1.25rem;
    border-radius: 8px;
    margin: 10px;
}
.details:hover{
    background-color: #0b5ed7;
    transition: 0.4s;
    cursor: pointer;
    transform: scale(1.1);
}
.pagination {
    display: flex;
    gap: 5px;
}
.pagination_list {
    display: flex;
    gap: 5px;
}
.pagination_list li {
    list-style: none;
}
.pagination_button {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
    padding: 3px;
    font-size: 0.8rem;
    border-radius: 8px;
}
.pagination_button {
    background-color: #0b5ed7;
    transition: 0.4s;
    cursor: pointer;
}
.list_page {
    list-style: none;
}

</style>