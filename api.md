Song
  - addTrack
  - removeTrack
  - transposeTrack
  - getTrack(name)


Track
  - addPart
  - removePart
  - transposeParts(parts[], amount)
  - moveParts(parts[], amount)
  - getPart(name)

  - transposeAllParts(amount)
  - moveAllParts(amount)

Part
  - addEvent
  - removeEvent
  - transposeEvents(events[], amount)
  - moveEvents(events[], amount)
  - getEvent(id)



Update levels:
  - transpose event: Part outline
  - transpose part: Part outline
  - transpose track: Part outline
  
  - move event: Part outline | Track part order | Song event order
  - remove event: complete update
  - add event: complete update