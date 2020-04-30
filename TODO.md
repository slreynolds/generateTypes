
% \begin{lstlisting}[frame=single, caption={Pseudocode for parseObject function}, captionpos=b]
% parseObject(object):
%   let obj = {}
%   lt types = ""
% 
%   for [key, value] of object
%       if type of v is Array
%           let arrayType = type of all elements in v
%           if arrayType is object
%             types += generateTypes(key, value)
%             obj[key] = key + "[]"
%           else
%             obj[key] = arrayType + "[]"
%       else if type of v is object
%           temp = generateTypes("", value)
%           out += temp.types
%           obj[key] = temp.innerObject
%       else
%           obj[key] = type of value
% 
%   return {
%     generatedObject: obj,
%     types: types
%   }
% \end{lstlisting}
% 
% \begin{lstlisting}[frame=single, caption={Pseudocode for parseArray function}, captionpos=b]
% parseArray(ArrayName, array):
%   let minimalProperties = collectMinimalPropertiesOf(array)
%   let optional = collectOptionalPropertiesOf(array)
%   let [generatedObject, types] = parseObject(array[0])
% 
%   // handling of optional properties
%   for [key, value] of optional
%       if type of value is Array
%         temp = parseArray(key, value)
%         types += temp.types
%         generatedObject[key + "?"] = key + "[]"
%       else if type of value is object
%         generatedObject[key + "?"] = generateTypes("", value).innerObject
%       else
%         generatedObject[key + "?"] = value
% 
%   if objectName is empty
%       return {
%         types: types,
%         object: generatedObject
%       }
%   else
%       return {
%         types: "type " + arrayName + " = " + generatedObject.toString() + types,
%         object: {}
%       }
% \end{lstlisting}
% 
% \begin{lstlisting}[frame=single, caption={Pseudocode for generateTypes function}, captionpos=b]
% generateTypes(objectName, object):
%   if type of object is Array
%       return parseArray(objectName, object)
%   else 
%       let [generatedObject, types] = parseObject(object)
%       if objectName is empty
%           return {
%             types: types,
%             innerObject: generatedObject
%           }
%       else
%           return {
%             types: "type " + objectName + " = " + generatedObject.toString() + types,
%             innerObject: {}
%           }
% \end{lstlisting}