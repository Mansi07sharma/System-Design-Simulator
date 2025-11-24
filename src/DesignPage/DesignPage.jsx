import { useTheme } from '../Context/ThemeContext';
import { useState, useCallback, useEffect } from 'react';
import TopToolbar from './TopToolBar';
import ComponentLibrary from './ComponentLibrary';
import { ReactFlow, addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useJwt } from '../Context/JwtContext';

import "@xyflow/react/dist/style.css";
import ResultPage from './ResultPage';

function DesignPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const designData = location.state;
  const { jwtToken } = useJwt()
  const isMobile = window.innerWidth < 768; 

  const { isDarkMode, setIsDarkMode } = useTheme();
  const [designTitle, setDesignTitle] = useState(designData?.title || 'Untitled Design');
  const [workloadRps, setWorkloadRps] = useState(designData?.rps || 0);
  const [slaLatencyMs, setSlaLatencyMs] = useState(designData?.slaLatency || 0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    components: 0,
    thumbnail: ""
  });
  const [savingDesign, setSavingDesign] = useState(false)
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState([])

  const [nodes, setNodes] = useState(designData?.nodes || []);
  const [edges, setEdges] = useState(designData?.edges || []);

  //node created
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  //edge created
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  //connection created
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: "step"
      }
      console.log('New edge created:', newEdge);
      setEdges((eds) => addEdge(newEdge, eds))
    },
    []
  );

  const startSimulation = async () => {
    console.log("Starting simulation with parameters:");
    if (!workloadRps || !slaLatencyMs) {
      alert("Please enter both Workload RPS and SLA Latency before starting the simulation.");
      return;
    }

    if (nodes.length === 0) {
      alert("Please add components to the design before starting the simulation.");
      return;
    }

    if (edges.length === 0) {
      alert("Please connect the components in the design before starting the simulation.");
      return;
    }
    console.log("nodes", nodes);
    console.log("edges", edges);
    const simulationParams = { nodes, edges, workloadRps, slaLatencyMs };
    setIsSimulating(true);
    const response = await fetch('http://localhost:3000/start-simulation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simulationParams)
    })

    if (response.ok) {
      const jsonResponse = await response.json();
      setResult(jsonResponse)
      setIsSimulating(false);
      setShowResults(true);
    }
  }

  const handleSaveDesign = async () => {
    console.log("clicked")
    console.log(jwtToken)
    if (nodes.length == 0 || edges.length == 0) {
      alert("Add atleast 2 node and 1 edge")
      return;
    }

    if (!workloadRps || !slaLatencyMs) {
      alert("Please enter both Workload RPS and SLA Latency before starting the simulation.");
      return;
    }

    if (!jwtToken)
      navigate('/login')

    setShowModal(true);
  }

  const submitDesign = async () => {
    setShowModal(false);
    setSavingDesign(true)
    const design = {
      "nodes": nodes,
      "edges": edges,
      "rps": workloadRps,
      "slaLatency": slaLatencyMs,
      "email": jwtToken.email,
      "title": designTitle,
      "description": formData.description,
      "components": formData.components
    }

    if (formData.thumbnail && formData.thumbnail.trim() !== "") {
      design.thumbnail = formData.thumbnail
    }

    console.log("Design to be saved:", design);
    await fetch('http://localhost:3000/saveDesign',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(design)
      }
    )

    setSavingDesign(false);
    navigate('/profile')
  }

  const handleClear = async()=>{
    setNodes([])
    setEdges([])
  }

  return (
    <>
      {isMobile ? (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-center p-6">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-4">Desktop Required</h2>
            <p className="text-gray-300 text-lg">
              The System Design Simulator works best on a laptop or desktop.
              Mobile screens cannot support drag and drop, graph canvas, and simulation features properly.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Please open this website on a laptop or PC for the best experience.
            </p>
          </div>
        </div>
      ) : (
        <>
          {(isSimulating || savingDesign) && (
            <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-fadeIn">
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-full border-4 border-white/40 border-t-blue-500 animate-spin"></div>
                  <div className="absolute inset-0 h-20 w-20 rounded-full blur-xl opacity-40 bg-blue-400 animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-semibold text-white drop-shadow-lg tracking-wide">
                  {isSimulating ? "Simulating..." : "Saving..."}
                </h2>
                <p className="text-white/80 mt-2 text-sm">
                  Please wait while we {isSimulating ? "analyze" : "saving"} your system design.
                </p>
              </div>
            </div>
          )}
          <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-200`}>
            <TopToolbar
              designTitle={designTitle}
              setDesignTitle={setDesignTitle}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              workloadRps={workloadRps}
              setWorkloadRps={setWorkloadRps}
              slaLatencyMs={slaLatencyMs}
              setSlaLatencyMs={setSlaLatencyMs}
              onSave={handleSaveDesign}
              onClear={handleClear}
              onStartSimulation={startSimulation}
            />

            <div className="flex h-[calc(100vh-64px)]">
              <ComponentLibrary isDarkMode={isDarkMode} setNodes={setNodes} />

              <div style={{ width: "100%", height: "500px" }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  fitView
                />
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl w-[450px] p-6 animate-scaleSlow">

                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Save System Design
                </h2>

                <div className="space-y-4">
                  <textarea
                    placeholder="Short Description"
                    className="w-full p-3 border rounded-lg"
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>

                  <input
                    type="number"
                    placeholder="Number of Components"
                    className="w-full p-3 border rounded-lg"
                    onChange={(e) => setFormData({ ...formData, components: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder='enter url'
                    className="w-full p-3 border rounded-lg"
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => submitDesign()}
                  >
                    Save
                  </button>
                </div>

              </div>
            </div>
          )}

          {showResults && <div className="fixed inset-0 bg-black/40 "><ResultPage results={result} setShowResults={setShowResults} /></div>}
        </>
      )}
    </>
  );
}

export default DesignPage
