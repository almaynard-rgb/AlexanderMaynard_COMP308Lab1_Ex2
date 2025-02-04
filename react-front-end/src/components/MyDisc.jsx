//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//MyDisc.jsx

//three.js imports
import * as THREE from 'three';
import React, { useEffect, useRef } from "react";

//NOTE: This is a modified version based off of the folowing tutorial code from the following link:  
//https://dev.to/omher/how-to-start-using-react-and-threejs-in-a-few-minutes-2h6g 

//this is the component that will be used to create the game disc shape 
// that is to be used in the list items when the user can add games to their collection
function MyDisc() {

  const refContainer = useRef(null);

  //useEffect to be called once when the page is loaded
  useEffect(() => {
    //set the scene, camera, and renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000); //set the camera
    var renderer = new THREE.WebGLRenderer({ //set the renderer 
      alpha: true, // transparent background
    });
    renderer.setSize(window.innerWidth/16, window.innerHeight/16); //set the size of the renderer
    //append rendered.domElement to the refContainer
    refContainer.current && refContainer.current.appendChild( renderer.domElement );
    
    camera.position.z = 1.6; //set the camera position

    //main disc shape variables
    var discGeometry = new THREE.RingGeometry(.95, 0.35, 32); // Using RingGeometry to create a thicker disc
    var discMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide }); //set the color of the disc and make it double sided
    var disc = new THREE.Mesh(discGeometry, discMaterial); //create the disc
    disc.position.x = 0; //set the position of the disc
    scene.add(disc);  //add the disc to the scene

    //inner disc variables for the inner disc shape (near the hole)
    var innerDiscGeometry = new THREE.RingGeometry(.3, 0.35, 32); // Using RingGeometry to create a thicker disc
    var innerDiscMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide }); //set the color of the inner disc and make it double sided
    var innerDisc = new THREE.Mesh(innerDiscGeometry, innerDiscMaterial);
    innerDisc.position.x = 0; //set the position of the inner disc
    scene.add(innerDisc); //add the inner disc to the scene

    //outer disc variables for the outer disc shape (the outer edge of the disc)
    var outerDiscGeometry = new THREE.RingGeometry(1, .95, 32); // Using RingGeometry to create a thicker disc
    var outerDiscMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide }); //set the color of the outer disc and make it double sided
    var outerDisc = new THREE.Mesh(outerDiscGeometry, outerDiscMaterial);
    outerDisc.position.x = 0; //set the position of the outer disc
    scene.add(outerDisc); //add the outer disc to the scene

    //animate function to rotate the discs at the same time and direction
    var animate = function () {
      requestAnimationFrame(animate);
      disc.rotation.x += 0.0;
      disc.rotation.y += 0.01;
      innerDisc.rotation.x += 0.0;
      innerDisc.rotation.y += 0.01;  
      outerDisc.rotation.x += 0.0;
      outerDisc.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate(); //call the animate function

    //check so that this does not re-render in our dom
    return () => {
      if(refContainer.current){
        refContainer.current.removeChild(renderer.domElement);
      }
    }


  }, []);
  return (
    <div ref={refContainer}></div>

  );
}

export default MyDisc; //export the MyDisc function