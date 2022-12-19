import Swal from 'sweetalert2'
import "./alert.scss";

export const alertSweetError = (title,content)=>{Swal.fire({
    icon: 'error',
    title: title,
    html: content

})}

export const alertSweetSuccess = (title,content, Done)=>{Swal.fire({
  icon: 'success',
  title: title,
  text: content  
}).then(()=>{
  if(Done != null){
      Done()
  }
})}

export const confrimSweet = (title,text,completeTitle,completetext,comfrimFunc)=>{
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0af',
        cancelButtonColor: 'rgba(218, 4, 4, 0.856)',
        confirmButtonText: 'Agree'
      }).then((result) => {
        if (result.isConfirmed) {
        comfrimFunc()
          Swal.fire(
            completeTitle,
            completetext,
            'success'
          )
        }
      })
}