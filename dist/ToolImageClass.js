class ToolImage {
    constructor(image , index, targetParent){
        this.image = image
        this.element = document.createElement('img');
        this.element.src = URL.createObjectURL(image);
        this.id = `tool-image-${index}`;
        this.element.classList.add("tool-image")
        this.imageControllerElement = document.createElement("div")
        this.imageControllerElement.classList.add("image-controller-element")
        const controllerSpan = document.createElement("span")
        controllerSpan.innerHTML = index + 1;
        this.imageControllerElement.appendChild(controllerSpan);
        if(index == 0){
            this.imageControllerElement.classList.add("active")
        }
        this.imageControllerElement.addEventListener("click", () => {
            this.appendToDocument(targetParent)
            document.querySelectorAll(".image-controller-element").forEach(elem => {
                elem.classList.remove("active")
            })
            this.imageControllerElement.classList.add("active")
        })
        document.getElementById("tool-image-controller").appendChild(this.imageControllerElement)
    }
    hide (){
        this.element.classList.add("hidden")
    }
    show (){
        this.element.classList.remove("hidden")
    }
    appendToDocument(targetParent){
        console.log("asd")
        targetParent.innerHTML = ""
        targetParent.appendChild(this.element)
    }
    removeFromDocument(){
        this.element.remove()
    }

}

export default ToolImage