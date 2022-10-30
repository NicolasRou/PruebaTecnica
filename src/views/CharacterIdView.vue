<template>
    <section class="display">
        <div class="display_info">
            <div class="img">
                <img :src="character.image" alt="">
            </div>
            <div class="container-menu">
                <div class="name">
                        <h2>{{character.name}}</h2>
                </div>
                <div class="estado">
                    <h3>Status: {{character.status}}</h3>
                </div>
                <div class="especie">
                    <h3>Species: {{character.species}}</h3>
                </div>
                <div class="genero">
                    <h3>Gender: {{character.gender}}</h3>
                </div>
                <div class="ubicacion">
                    <h3>Location: {{location}}</h3>
                </div>
                <div class="comentarios">
                    <h3>Comentarios: {{acountComments}}</h3>
                </div>
            </div>
        </div>
        <div>
            <div class="comment_title">
                <h2>
                    ¡Deja tu comentario o reseña de este peronaje!
                </h2>
            </div>
            <div> 
                <form @submit.prevent="SendComments()" class="form">
                    <label for=""> ID: </label>
                    <select v-model="character_id" class="select_id">
                        <option :value="character.id"> {{character.id}} </option>
                    </select>
                    <label for=""> Nombre del personaje: </label>
                    <select v-model="name" class="select_name">
                        <option :value="character.name"> {{character.name}} </option>
                    </select>
                    <input type="text" placeholder="Nombre del usuario" v-model="name_user" class="name_user" />
                    <textarea id="" cols="30" rows="10" placeholder="Escribe tus comentarios" v-model="comment_"></textarea>
                    <button type="submit" class="submit">Enviar</button>
                </form>
            </div>
        </div>
    </section>
    <section class="section_comment">
        <div>
            <h2>Comentarios y reseñas de otros usuarios</h2>
        </div>
        <div class="container_comment">
            <ul>
                <li v-for=" g of getComment.data" :key="g.id">
                    <div class="comment_div">
                        <h3>{{g.name_user}}:</h3>
                       <h4>"{{g.comment_}}"</h4> 
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

export default {
    setup () {
        const character = ref([]);
        const route = useRoute();
        const name = ref("");
        const name_user = ref("");
        const character_id = ref("");
        const comment_ = ref("");
        const getComment = ref("");
        const episodes = ref([]);
        const location = ref("");
        const acountComments = ref("");

        const CharacterView = () => {
                fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`)
                .then(response => response.json())
                .then(data => {
                    character.value = data;
                    episodes.value = data.episode
                    location.value = data.location.name
                })
        }

        const GetComments = () => {
            fetch(`http://localhost:3500/character/${route.params.id}/comments`)
                .then(response => response.json())
                .then(data => {
                    getComment.value = data;
                    acountComments.value = data.comments;
                    console.log(acountComments)
                })
        }
        
        const SendComments = () => {
           console.log(comment_.value)
            fetch(`http://localhost:3500/character/${route.params.id}/comments`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    character_id: character_id.value,
                    name: name.value,
                    name_user: name_user.value,
                    comment_: comment_.value
                })
            })  .then(response => response.json())
                .then((response) => console.log(response))
        }   
    
        onMounted (()=>{
        CharacterView()
        GetComments()
        })
        
        return {
        character,
        CharacterView,
        SendComments,
        character_id,
        name,
        name_user,
        comment_,
        GetComments,
        getComment,
        episodes,
        location,
        acountComments
        }
    }
}
</script>
<style>
.display {
    margin-top: 80px;
}
.display_info {
    display: flex;
    gap: 30px;
}
.container-menu {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
}
.comment_title {
    margin: 30px;
}
.form {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: auto;
    gap: 10px;
    align-items: flex-start;
}
.select_id, .select_name {
    width: 20%;
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
    padding: 5px;
    border-radius: 8px;
}
.select_id option {
    border-radius: 8px;
}
.name_user {
    width: 50%;
    border: 2px solid #0b5ed7;
    border-radius: 8px;
    box-shadow: 1px 3px 9px rgb(0 0 0 / 25%);
    padding: 10px 15px;
    font-size: 1rem;
}
textarea {
    width: 50%;
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
.container_comment li {
    margin: 30px;
    list-style: none;
}
.section_comment {
    width: 50%;
    margin: 20px auto 100px;
}
.container_comment h3, .container_comment h4 {
    text-align: left;
    margin: 6px;
}

</style>