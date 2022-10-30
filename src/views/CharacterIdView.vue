<template>
    <div class="display">
        <div class="conainer-menu">
            <div class="container" >
                <div class="name">
                        <h2>{{character.name}}</h2>
                </div>
                <div class="img">
                    <img :src="character.image" alt="">
                </div>
                <div class="estado">
                    <h3>{{character.status}}</h3>
                </div>
                <div class="especie">
                    <h3>Species: {{character.species}}</h3>
                </div>
                <div class="genero">
                    <h3>Gender: {{character.gender}}</h3>
                </div>
                <div class="ubicacion">
                    <h3>Episodios: </h3>
                </div>
                <div class="comentarios">
                    <h3>Comentarios: </h3>
                </div>
            </div>
        </div>
        <div>
            <div>
                <h3>
                    ¡Deja tu comentario o reseña de este peronaje!
                </h3>
            </div>
            <div> 
                <form @submit.prevent="SendComments()">
                    <label for=""> ID </label>
                    <select v-model="character_id">
                        <option :value="character.id"> {{character.id}} </option>
                    </select>
                    <label for=""> Nombre del personaje </label>
                    <select v-model="name">
                        <option :value="character.name"> {{character.name}} </option>
                    </select>
                    <input type="text" placeholder="Nombre del usuario" v-model="name_user" />
                    <textarea id="" cols="30" rows="10" placeholder="Escribe tus comentarios" v-model="comment_"></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    </div>
    <div>
        <div>
            <h3>Comentarios y reseñas de otros usuarios</h3>
        </div>
        <div>
            <ul>
                <li v-for=" g of getComment.data" :key="g.id">
                    <div>
                       <p>{{g.comment_}}</p> 
                    </div>
                </li>
            </ul>
        </div>

    </div>
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
            
        const CharacterView = () => {
                fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`)
                .then(response => response.json())
                .then(data => {
                    character.value = data;
                    
                })
                    
        }

        const GetComments = () => {
            fetch(`http://localhost:3500/character/${route.params.id}/comments`)
                .then(response => response.json())
                .then(data => {
                    getComment.value = data;
                    console.log(getComment.value.data[0].comment_)
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
        getComment
       
    
       
        
            
            
            
        }
    }
}

</script>