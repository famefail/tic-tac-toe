interface IPopup{
    isVisible: boolean
    header: string
    description?: string
    onClick: () => void
}


const Popup = ({isVisible, header, description, onClick}:IPopup) => {
    return (
        <>
        {isVisible && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-lg max-w-md w-full ">
              <h1 className="text-center text-4xl m-8 text-gray-800" >{header}</h1>
              <div className="text-center text-2xl m-8">{description}</div>
              <button onClick={onClick} className="text-white bg-gray-800 flex justify-center w-full p-4 rounded-full">
                Next Game
              </button>
            </div>
          </div>}
        </>
    )
}

export default Popup