
class Banner {
  constructor( id, parent ) {

    this.wrapper = document.createElement('div');
    this.element = document.createElement('canvas');
    parent.appendChild(wrapper);
    divWrapper.appendChild(element);
  
    this.wrapper.id = id;
    this.element.width = width;
    this.element.height = height;
  
    let ctx = this.element.getContext('2d');
  
    return {
      ctx: ctx,
      id: id
    }
  
  }




}




function create_banner(id, parent, width, height) {
  let divWrapper = document.createElement('div');
  let canvasElem = document.createElement('canvas');
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);

  divWrapper.id = id;
  canvasElem.width = width;
  canvasElem.height = height;

  let ctx = canvasElem.getContext('2d');

  return {
    ctx: ctx,
    id: id
  };
}

function create(id, parent, width, height) {
  let divWrapper = document.createElement('div');
  let canvasElem = document.createElement('canvas');
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);

  divWrapper.id = id;
  canvasElem.width = width;
  canvasElem.height = height;

  let ctx = canvasElem.getContext('2d');

  return {
    ctx: ctx,
    id: id
  };
}


  
  export { create, createReportList };