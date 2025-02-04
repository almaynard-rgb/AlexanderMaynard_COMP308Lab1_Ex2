//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1


//MyX.jsx


//three.js imports
import * as THREE from 'three';
import React, { useEffect, useRef } from "react";

//NOTE: This is a modified version based off of the folowing tutorial code from the following link:  
//https://dev.to/omher/how-to-start-using-react-and-threejs-in-a-few-minutes-2h6g 

//this is the component that will be used to create the X shape that is added to each game in the games list if the user isn't logged in
function MyX() {
  const refContainer = useRef(null);
  
  //useEffect to be called once when the page is loaded
  useEffect(() => {
    //set the scene, camera, and renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({
      alpha: true, // transparent background
    });

    //set the size of the renderer
    renderer.setSize(window.innerWidth/16, window.innerHeight/16);

    //append rendered.domElement to the refContainer
    refContainer.current && refContainer.current.appendChild( renderer.domElement );
    
    camera.position.z = 0.75; //set the camera position


    //Note: the 'x' shape is created using two rectangles that are rotated at 40 and -40 degrees

    //retangle 1 variables
    var rectangleGeometry = new THREE.BoxGeometry(0.2, 1, 0.2); // Using BoxGeometry to create a rectangle
    var rectangleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }); //set the color of the rectangle and make it double sided
    var rectangle1 = new THREE.Mesh(rectangleGeometry, rectangleMaterial); //create the rectangle
    rectangle1.position.x = 0; //set the position of the rectangle
    rectangle1.rotation.set(0, 0, 40);  //set the rotation of the rectangle (first side of the x)
    scene.add(rectangle1);

    //rectangle2 disc variables
    var rectangle2 = new THREE.Mesh(rectangleGeometry, rectangleMaterial); //create the rectangle using the original values
    rectangle2.position.x = 0;
    rectangle2.rotation.set(0,0, -40)
    scene.add(rectangle2);
    

    //animate function to rotate the rectangles at the same time and direction
    var animate = function () {
      requestAnimationFrame(animate);
      rectangle1.rotation.y += 0.01;
      rectangle2.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate(); //call the animate function

    //check so that this does not re-render in our dom if the page is reloaded
    return () => {
      if(refContainer.current){
        refContainer.current.removeChild(renderer.domElement);
      }
    }


  }, []);

  //return the refContainer
  return (
    <div ref={refContainer}></div>
  );
}

export default MyX