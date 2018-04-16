import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  private settings: any;
  private data: any[];

  constructor() { }

  ngOnInit() {

    this.settings = {
      columns: {
        id: {
          title: 'ID'

        },
        nombre: {
          title: 'Nombre'

        },
        apellido: {
          title: 'Apellido'

        },
        fechaIngreso: {
          title: 'Fecha Ingreso'
        },
        email: {
          title: 'Email'
        }
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped'
      }
    }

    this.data = [
      {
        id: 1,
        nombre: "Leanne Graham",
        apellido: "Bret",
        fechaIngreso: new Date(),
        email: "Sincere@april.biz"
      },
      {
        id: 2,
        nombre: "Ervin Howell",
        apellido: "Antonette",
        fechaIngreso: new Date(),
        email: "Shanna@melissa.tv"
      },

      // ... list of items

      {
        id: 11,
        nombre: "Nicholas DuBuque",
        apellido: "Nicholas.Stanton",
        fechaIngreso: new Date(),
        email: "Rey.Padberg@rosamond.biz"
      },
       {
        id: 1,
        nombre: "Leanne Graham",
        apellido: "Bret",
        fechaIngreso: new Date(),
        email: "Sincere@april.biz"
      },
      {
        id: 2,
        nombre: "Ervin Howell",
        apellido: "Antonette",
        fechaIngreso: new Date(),
        email: "Shanna@melissa.tv"
      },

      // ... list of items

      {
        id: 11,
        nombre: "Nicholas DuBuque",
        apellido: "Nicholas.Stanton",
        fechaIngreso: new Date(),
        email: "Rey.Padberg@rosamond.biz"
      },
       {
        id: 1,
        nombre: "Leanne Graham",
        apellido: "Bret",
        fechaIngreso: new Date(),
        email: "Sincere@april.biz"
      },
      {
        id: 2,
        nombre: "Ervin Howell",
        apellido: "Antonette",
        fechaIngreso: new Date(),
        email: "Shanna@melissa.tv"
      },

      // ... list of items

      {
        id: 11,
        nombre: "Nicholas DuBuque",
        apellido: "Nicholas.Stanton",
        fechaIngreso: new Date(),
        email: "Rey.Padberg@rosamond.biz"
      },
       {
        id: 1,
        nombre: "Leanne Graham",
        apellido: "Bret",
        fechaIngreso: new Date(),
        email: "Sincere@april.biz"
      },
      {
        id: 2,
        nombre: "Ervin Howell",
        apellido: "Antonette",
        fechaIngreso: new Date(),
        email: "Shanna@melissa.tv"
      },

      // ... list of items

      {
        id: 11,
        nombre: "Nicholas DuBuque",
        apellido: "Nicholas.Stanton",
        fechaIngreso: new Date(),
        email: "Rey.Padberg@rosamond.biz"
      },
       {
        id: 1,
        nombre: "Leanne Graham",
        apellido: "Bret",
        fechaIngreso: new Date(),
        email: "Sincere@april.biz"
      },
      {
        id: 2,
        nombre: "Ervin Howell",
        apellido: "Antonette",
        fechaIngreso: new Date(),
        email: "Shanna@melissa.tv"
      },

      // ... list of items

      {
        id: 11,
        nombre: "Nicholas DuBuque",
        apellido: "Nicholas.Stanton",
        fechaIngreso: new Date(),
        email: "Rey.Padberg@rosamond.biz"
      }
    ];
  }

}
