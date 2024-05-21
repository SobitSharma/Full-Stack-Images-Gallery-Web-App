export default function SecondCard({url, keyvalue, imagename, username}){
    return (
        <div className="relative h-[400px] w-[300px] rounded-md overflow-hidden">
          <img
            src={url}
            key={keyvalue}
            alt="Image"
            className="z-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h3 className="bg-white text-black p-2">This image is uploaded by {username}</h3>
            <p className="mt-2 text-sm text-gray-300">
              {imagename}
            </p>
          </div>
        </div>
      );
}