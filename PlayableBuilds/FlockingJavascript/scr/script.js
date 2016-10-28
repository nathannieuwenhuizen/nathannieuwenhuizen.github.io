/*
Made by: Nathan Nieuwenhuizen

This script demonstrates and handles the flocking movement/system of these agents

The velocity vector for each agent is calculated by three rules:
-the Cohesion
-the Seperation
-the Allignment

With these rules you can create group movements like: birds, fish and bactaria.
*/

//As the windows loads.
window.addEventListener("load",function(){
    //Canvas and context is defined.
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    
    //Canvas gets size of the window screen.
    canvas.width = window.innerWidth- 30;
    canvas.height = window.innerHeight - 30;
     
    //prevents selecting the text.
    document.onselectstart = new Function("return false");
    
    //Declares the menu buttons.
    var showButton = document.getElementById("showButton");
    var menu = document.querySelector("#groupInfo");
    menu.style.display = "none";
    var clearButton = document.getElementById("clearButton");
    var spawnButton = document.getElementById("spawnButton");
    
    //Declares the variables needed for the editData function.
    var agentSpeed, groupAmount, randomPos, followsMouse,mouseSpawning, seperationForce, cohesionForce, allignmentForce, agentSize;
    
    
    var maxAgents = 500;
    var attractorPos = new Vector();
    
    //Makes an empty array.
    var agents = [];
    
    
    //Calls the updateData and SpawnGroup.
    updateData();
    spawnGroup();
    
    
    //Click event at the screen.
    addEventListener("click", function(e){
        if(mouseSpawning)
            spawnAgent(
            new Vector(e.clientX - canvas.offsetLeft,e.clientY - canvas.offsetTop),
            new Vector(1-Math.random()*2,1-Math.random()*2)
            );
    });
    
    //Updates the attractorPos with the mouse position.
    addEventListener("mousemove", function(e){
        attractorPos.x = e.clientX - canvas.offsetLeft;
        attractorPos.y = e.clientY - canvas.offsetTop;
    });
    
    //Button events
    clearButton.onclick = function(){ agents = []; };
    spawnButton.onclick = function(){ spawnGroup(); };
    showButton.onclick = function () {
        if(menu.style.display == "block")
            menu.style.display = "none";
        else
            menu.style.display = "block";
    };
    
    //The updateData function edits the variables with the document vaules from the HTML file.
    function updateData()
    {
        agentSize = document.getElementById("agentSizeField").value;
        agentSpeed = document.getElementById("agentSpeedField").value;
        groupAmount = document.getElementById("groupAmountField").value;
        randomPos = document.getElementById("randomPositionsToggle").checked;
        followsMouse = document.getElementById("followsMouseToggle").checked;
        mouseSpawning = document.getElementById("mouseSpawnToggle").checked;
        
        //These vaules must be max at 1, in index.html the max value is 1000.
        seperationForce = document.getElementById("seperationForceField").value/1000;
        allignmentForce = document.getElementById("allignmentForceField").value/1000;
        cohesionForce = document.getElementById("cohesionForceField").value/1000;
        
    }
    
    //Spawns a group of agents.
    function spawnGroup()
    {
        for(var i = 0; i <groupAmount; i++)
        {
            var position;
            if(randomPos)
                position = new Vector(canvas.width*Math.random(),canvas.height*Math.random());
            else
                position = new Vector(canvas.width/2,canvas.height/2);
            
            if(agents.length < maxAgents)
                spawnAgent(
                position,
                new Vector(1-Math.random()*2,1-Math.random()*2)
                );
        }
    }
    
    //This function spawnes an agent at a position and velocity and adds it to the array.
    function spawnAgent(position,velocity)
    {
        var agent = new Agent(position,velocity,agentSize);
        agents.push(agent);
    }
    
    
    //Update function
    !function update() {
        window.requestAnimationFrame(update);
        
        
        //Clear rects the canvas with a color that has an alpha below the 1, so you get a more fade effect.
        context.fillStyle = "rgba(20,0,0, 0.2)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        
        //updates the data from the index.HTML document.
        updateData();
        
        
        //for each agent
        for(var i = 0; i <agents.length; i++)
        {
            //The calculated velocities of the three rules are added multiplied with the forces.
            agents[i].velocity.Add(CalculateAllignment(agents[i]).x*allignmentForce + 
                                   CalculateCohesion(agents[i]).x*cohesionForce + 
                                   CalculateSeperation(agents[i]).x*seperationForce ,
                                   CalculateAllignment(agents[i]).y*allignmentForce + 
                                   CalculateCohesion(agents[i]).y*cohesionForce + 
                                   CalculateSeperation(agents[i]).y*seperationForce);
            
            //If they are attracted by the mouse.
            if(followsMouse)
            {
                //If the distance to the mouse is below 500 px.
                if( agents[i].position.DistanceFrom(attractorPos) < 500 )
                {
                    var magnetDistance =1+ agents[i].position.DistanceFrom(attractorPos)/100;
                    var attractDirection = new Vector(attractorPos.x-agents[i].position.x,attractorPos.y-agents[i].position.y);
                    attractDirection.Normalizen();
                    
                    //Applies the additional velocity towards the mouse.
                    agents[i].velocity.Add(attractDirection.x/magnetDistance,attractDirection.y/magnetDistance);
                }
            }
            
            //Normalizes the velocity to 1
            agents[i].velocity.Normalizen();
            
            //multiplies it with the speed.
            agents[i].velocity.Multiply(agentSpeed);
            
            
            //Updates adn draws the agent.
            agents[i].Update(canvas);
            agents[i].Draw(context);
        }
        
    }();
    
    
    /*
    These functions are the three rules every agent should calculate arround its neighbour agents.
    Allignment makes sure the agent goes with the same direction of itsa neighbours, 
    Cohesion makes sure the agent wants to be part of the group
    and Seperation makes sure the agent doesn't goes to close to its neighbour agents.
    */
    
    //This returns the vector of the neighbour agents average direction/velocity.
    function CalculateAllignment(agent)
    {
        var vector = new Vector();
        var neighbours = 0;
        for(var a = 0; a <agents.length; a++)
            {
                if(agents[a] != agent && agents[a].position.DistanceFrom(agent.position) < 200)
                {
                    vector.Add(agents[a].velocity.x,agents[a].velocity.y);
                    neighbours++;
                }
            }
        if(neighbours >0)
        {
            vector.Devide(neighbours);
            vector.Normalizen();
        }
        return vector;
    }
    
    //This returns the vector towards the average position of the neighbour agents.
    function CalculateCohesion(agent)
    {
        var vector = new Vector(0,0);
        var neighbours = 0;
        for(var c = 0; c <agents.length; c++)
            {
                if(agents[c] != agent && agents[c].position.DistanceFrom(agent.position) < 200)
                {
                    vector.Add(agents[c].position.x,agents[c].position.y);
                    neighbours++;
                }
            }
        
        if(neighbours >0)
        {
            vector.Devide(neighbours);
            vector.Add(-agent.position.x,-agent.position.y);
            vector.Normalizen();
        }
        return vector;
    }
    
    
    //This returns the vector towards the distances of all the neighbour agents added, and then made negative.
    function CalculateSeperation(agent)
    {
        var vector = new Vector();
        
        for(var s = 0; s <agents.length; s++)
            {
                if(agents[s] != agent && agents[s].position.DistanceFrom(agent.position) < 50)
                {
                    vector.Add(agents[s].position.x - agent.position.x,agents[s].position.y - agent.position.y);
                }
            }
        
            vector.Multiply(-1);
            vector.Normalizen(1);
        
        
        return vector;
    }
    
})