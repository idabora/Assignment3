// $(document).on('click',".like",(event)=>{
//     var button=$(event.target);
//     $.ajax({
//         url:`/api/posts/${postId}/like`,
//         type:"PUT",
//         success:(postdata)=>{
//             // console.log(postdata.likes.length);
//             button.find('span').text(postdata.likes.length || "")
//         },
//         error:(error)=>{
//             console.log(`error  ${error}`);
//         }

//     })

// })

const likebtn = document.querySelector('.like',ds)
function ds(){
    document.getElementById("likeCount").innerHTML = "1";
}