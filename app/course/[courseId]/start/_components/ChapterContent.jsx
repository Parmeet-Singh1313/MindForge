import { useState } from "react";
import { HiMiniClipboardDocumentCheck, HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import YouTube from "react-youtube";

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0,
    },
};

function ChapterContent({ chapter, content }) {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [iconChanged, setIconChanged] = useState({});
    const chapterContent = Array.isArray(content) ? content[0] : content;

    const cleanCode = (code) => {
        if (!code) return '';
        return code.replace(/<precode>|<\/precode>/g, '').trim();
    };


    const handleCopyClick = async (code, index) => {
        try {
            await navigator.clipboard.writeText(cleanCode(code));
            setCopiedIndex(index);
            setIconChanged(prev => ({ ...prev, [index]: true }));
            setTimeout(() => {
                setCopiedIndex(null);
                setIconChanged(prev => ({ ...prev, [index]: false }));
            }, 3000);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };
    return (
        <div className="p-10">
            <h2 className="font-medium text-2xl ">{chapter?.chapterName}</h2>
            <p className="text-gray-500">{chapter?.about}</p>

            <div className="flex justify-center my-6">
                <YouTube videoId={chapterContent?.videoId} opts={opts} />
            </div>

            <div>
                {chapterContent?.content?.chapter?.sections?.map((item, index) => (
                    <div key={index} className="p-5 mb-6 bg-slate-50 rounded-lg">
                        <h2 className="font-medium text-lg">{item?.title}</h2>
                        <ReactMarkdown
                            components={{
                                p: ({ node, ...props }) => (
                                    <p className="text-gray-600 mb-4" {...props} />
                                ),
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-2xl font-bold mb-4" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-xl font-bold mb-3" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc pl-6 mb-4" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol className="list-decimal pl-6 mb-4" {...props} />
                                ),
                            }}
                        >
                            {item?.explanation || item?.description}
                        </ReactMarkdown>
                        {item?.code_example?.code && (
                            <div className="p-4 bg-black text-white rounded-md mt-3 relative">
                                <button
                                    onClick={() => handleCopyClick(item?.code_example?.code, index)}
                                    className="absolute top-4 right-4 hover:text-gray-300 transition-colors"
                                >
                                    {iconChanged[index] ?
                                        <HiMiniClipboardDocumentCheck className="text-2xl text-green-500" /> :
                                        <HiOutlineClipboardDocumentCheck className="text-2xl" />
                                    }
                                </button>
                                <pre className="whitespace-pre-wrap">
                                    {cleanCode(item?.code_example?.code)}
                                </pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChapterContent