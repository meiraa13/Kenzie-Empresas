import { createDepartment } from "./requests.js";
import { listDepartments } from "./requests.js";
import { listUsers } from "./requests.js";
import { renderDepartments } from "./adm.js";
import { listCompanies } from "./requests.js";
import { editDepartment } from "./requests.js";
import { deleteDepartment } from "./requests.js";
import { editUsers } from "./requests.js";
import { renderUsers } from "./adm.js";
import { deleteUser } from "./requests.js";
import { usersNoDptm } from "./requests.js";
import { hireUser } from "./requests.js";
import { openModal } from "./modal.js";

async function createDepoForm(){

    let companies = await listCompanies()
  

    const formulario = document.createElement('form')
    formulario.classList.add('form')

    let h1 = document.createElement('h1')
    h1.innerText = 'Criar Departamento'

    let input1 = document.createElement('input')
    input1.placeholder = 'Nome do departamento'
    input1.name = 'name'
    let input2 = document.createElement('input')
    input2.placeholder = 'Descrição'
    input2.name = 'description'
    let select = document.createElement('select')
    select.name = 'company_uuid'
    select.classList = 'select-form'
    let optionPlaceholder = document.createElement('option')
    optionPlaceholder.innerText = 'Selecionar Empresa'
    select.appendChild(optionPlaceholder)


    companies.forEach((company)=>{

        let option = document.createElement('option')
        option.value = company.uuid
        option.innerText = company.name
        select.appendChild(option)

    })


    let button = document.createElement('button')
    button.classList = 'btn-createForm'
    button.innerText = 'Criar o departamento'

    formulario.append(h1, input1, input2, select, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        const inputs = [...e.target]

        const newDepo = {}

        inputs.forEach((input)=>{

           if(input.name){

            newDepo[input.name] = input.value
           }
            
        })

        await createDepartment(newDepo)
        await renderDepartments()
       

    })

    return formulario

}

async function editDptmForm(department){

    const formulario = document.createElement('form')
    formulario.classList.add('form')

    let h1 = document.createElement('h1')
    h1.innerText = 'Editar Departamento'

    let input1 = document.createElement('input')
    input1.placeholder = department.description
    input1.name = 'description'
    input1.classList = 'input-editForm'
    let button = document.createElement('button')
    button.innerText = 'Editar o departamento'
    button.classList = 'btn-createForm'

    formulario.append(h1, input1, button)

    formulario.addEventListener('submit', async(e)=>{
        e.preventDefault()

        e.path[2].remove()

        const inputs = [...e.target]
        
        const postBody = {}

        inputs.forEach((input)=>{

            if(input.name){

                postBody[input.name] = input.value
            }
        })

        await editDepartment(postBody, department.uuid)
        await renderDepartments()



    })


    return formulario

}

async function deleteDptmForm(department){

    const formulario = document.createElement('form')
    formulario.classList = 'form-delete'

    let h2 = document.createElement('h2')
    h2.innerText = `Realmente deseja deletar o departamento ${department.name} e demitir seus funcionários?`
    let button = document.createElement('button')
    button.classList = 'btn-deleteForm'
    button.innerText = 'Confirmar'

    formulario.append(h2, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        await deleteDepartment(department.uuid)
        await renderDepartments()
        await renderUsers()

    })

    return formulario

}

async function editUserForm(user){

    const formulario = document.createElement('form')
    formulario.classList = 'form-editUser'

    let h1 = document.createElement('h1')
    h1.innerText = 'Editar Usuário'

    let select1 = document.createElement('select')
    select1.name = 'kind_of_work'
    select1.classList = 'select-form'
    let optionPlaceholder = document.createElement('option')
    optionPlaceholder.innerText = 'Selecione modalidade de trabalho*'
    let option1 = document.createElement('option')
    option1.value = 'hibrido'
    option1.innerText = 'hibrido'
    let option2 = document.createElement('option')
    option2.value = 'presencial'
    option2.innerText = 'presencial'
    let option3 = document.createElement('option')
    option3.value = 'home office'
    option3.innerText = 'home office'
    select1.append(optionPlaceholder, option1, option2, option3)

    let select2 = document.createElement('select')
    select2.name = 'professional_level'
    select2.classList = 'select-form'
    let optionPlaceholder2 = document.createElement('option')
    optionPlaceholder2.innerText = 'Selecione nível profissional*'
    let option4 = document.createElement('option')
    option4.value = 'estágio'
    option4.innerText = 'estágio'
    let option5 = document.createElement('option')
    option5.value = 'júnior'
    option5.innerText = 'júnior'
    let option6 = document.createElement('option')
    option6.value = 'pleno'
    option6.innerText = 'pleno'
    let option7 = document.createElement('option')
    option7.value = 'sênior'
    option7.innerText = 'sênior'
    select2.append(optionPlaceholder2, option4, option5, option6, option7)

    let button = document.createElement('button')
    button.innerText = 'Editar'
    button.classList = 'btn-createForm'

    formulario.append(h1, select1, select2, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        const inputs = [...e.target]
        const userInfo = {}

        inputs.forEach((input)=>{

            if(input.name){

                userInfo[input.name] = input.value
            }
        })

        await editUsers(userInfo, user.uuid)
        await renderUsers()

    })

    return formulario

}

async function deleteUserForm(user){

    const formulario = document.createElement('form')
    formulario.classList = 'form-delete'

    let h2 = document.createElement('h2')
    h2.innerText = `Realmente deseja remover o usuário ${user.username}?`
    let button = document.createElement('button')
    button.innerText = 'Confirmar'
    button.classList = 'btn-deleteForm'

    formulario.append(h2, button)

    formulario.addEventListener('submit', async(e)=>{

        e.preventDefault()
        e.path[2].remove()

        await deleteUser(user.uuid)
        await renderUsers()

    })

    return formulario

}


async function admViewForm(dptm, array){

    const usersArray = await usersNoDptm()
    const userDptm = await listUsers()
    
    const div = document.createElement('div')
    div.classList = 'div-form'
    const formulario = document.createElement('form')
    formulario.classList = 'form-view'

    let h1 = document.createElement('h1')
    h1.innerText = dptm.name
    let div1 = document.createElement('div')
    div1.classList = 'main-div-form'
    let div2 = document.createElement('div')
    div2.classList = 'div-left'
    let div3 = document.createElement('div')
    div3.classList = 'div-right'
    let h4 = document.createElement('h4')
    h4.innerText = dptm.description
    let p = document.createElement('p')
    p.innerText = dptm.companies.name
    div2.append(h4, p)

    let select = document.createElement('select')
    select.name = 'user_uuid'
    select.classList = 'select-form-view'
    let optionPlaceholder = document.createElement('option')
    optionPlaceholder.innerText = 'Selecionar usuário'
    select.appendChild(optionPlaceholder)

    usersArray.forEach((user)=>{

        let option = document.createElement('option')
        option.value = user.uuid
        option.innerText = user.username
        select.appendChild(option)

    })

    let button = document.createElement('button')
    button.innerText = 'Contratar'
    button.classList = 'btn-viewForm'

    div3.append(select, button)
    div1.append(div2, div3)

    formulario.append(h1, div1)

    formulario.addEventListener('submit', async(e)=>{

            e.preventDefault()
            e.path[3].remove()

            const inputs = [...e.target]
            const body = {}

            inputs.forEach((input)=>{

                if(input.name){
                    
                    body[input.name] = input.value
                }

            })
            body['department_uuid'] = dptm.uuid

            await hireUser(body)
            await renderDepartments()
            await renderUsers()
        
        })

    let ul = document.createElement('ul')
    ul.classList = 'ul-form'

    let newArray2 = userDptm.filter((depo)=> depo.department_uuid == dptm.uuid)

    if(newArray2){
        newArray2.forEach((user)=>{

            let newArray = array.find((dptm)=> dptm.uuid == user.department_uuid)
            
          
            let li = document.createElement('li')
            li.classList = 'li-form'
    
            let h4 = document.createElement('h4')
            h4.innerText = user.username
            let p1 = document.createElement('p')
            p1.innerText = user.professional_level
            let p2 = document.createElement('p')
            if(newArray){
    
                p2.innerText = newArray.companies.name
            }
          
            let divbtn = document.createElement('div')
            divbtn.classList = 'div-btn'
            let btn = document.createElement('button')
            btn.classList = 'btn-desligar-form'
            btn.innerText = 'Desligar'

            btn.addEventListener('click',async(e)=>{

                e.path[6].remove()

                const deleteUser = await deleteUserForm(user)
                openModal(deleteUser)


            })
    
            divbtn.appendChild(btn)
            li.append(h4,p1,p2, divbtn)
            ul.appendChild(li)
    
        })
    
    }
   

    div.append(formulario, ul)
    return div


}



export { createDepoForm, editDptmForm, deleteDptmForm, editUserForm, deleteUserForm, admViewForm }