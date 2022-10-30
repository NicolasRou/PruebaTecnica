<template>
    <div class="home">
      <div class="search">
        <form @submit.prevent="SearchCharacters()" class="search-box">
            <input type="text" placeholder="What are you looking for?" v-model="search" />
            <input type="submit" value="Search" />
        </form>
      </div>
        <div class="display">
            <ul>
                <li v-for=" c of character" :key="c.id" class="card">
                    <div class="conainer-menu">
                        <div class="container" >
                            <div class="name">
                                <h2>{{c.name}}</h2>
                            </div>
                            <div class="img">
                                <img :src="c.image" alt="">
                            </div>
                            <div class="estado">
                                <h3>{{c.status}}</h3>
                            </div>
                            <div class="especie">
                                <h3>Species: {{c.species}}</h3>
                            </div>
                            <div class="genero">
                                <h3>Gender: {{c.gender}}</h3>
                            </div>
                            <div class="ubicacion">
                                <h3>Location: {{c.location.name}}</h3>
                            </div>
                            <div class="comentarios">
                                <h3>Comentarios: </h3>
                            </div>
                        </div>
                    </div>
                    <router-link v-bind:to="`/character/${c.id}`">
                        <button> Mas detalles</button>
                    </router-link>
                </li>
                <router-view/>
            </ul>
        </div>
        <div div>
            <ul>
                <li v-for="page in pages" v-bind:key="page"><a @click.prevent="Pagination(page)" href="#!">{{page}}</a></li>
            </ul>
            <button @click.prevent="Pagination(page--)" >Anterior</button>
            <ul>
                <li>
                    <a>{{page}}</a>
                </li>
            </ul>
            <button @click.prevent="Pagination(page++)" >Siguiente</button>
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

        // const  AmountComments = () => {
        //     fetch(`http://localhost:3500/character/${elements.value}/comments`)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data.comments)
        //             comments.value = data.comments;
                    
                   
        //         })
                
        // }
        
        onMounted (()=>{
            CharacterView()
            // AmountComments()
          
            
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
            // AmountComments,
          
            
        }
    }
}

</script>

<style>
.card {
    list-style: none;
    margin: 50px;
}
</style>