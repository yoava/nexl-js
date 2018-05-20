define("ace/mode/lsl_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
  "use strict";

  function s() {
    var e = this.createKeywordMapper({
      "constant.language.float.lsl": "DEG_TO_RAD|PI|PI_BY_TWO|RAD_TO_DEG|SQRT2|TWO_PI",
      "constant.language.integer.lsl": "ACTIVE|AGENT|AGENT_ALWAYS_RUN|AGENT_ATTACHMENTS|AGENT_AUTOPILOT|AGENT_AWAY|AGENT_BUSY|AGENT_BY_LEGACY_NAME|AGENT_BY_USERNAME|AGENT_CROUCHING|AGENT_FLYING|AGENT_IN_AIR|AGENT_LIST_PARCEL|AGENT_LIST_PARCEL_OWNER|AGENT_LIST_REGION|AGENT_MOUSELOOK|AGENT_ON_OBJECT|AGENT_SCRIPTED|AGENT_SITTING|AGENT_TYPING|AGENT_WALKING|ALL_SIDES|ANIM_ON|ATTACH_AVATAR_CENTER|ATTACH_BACK|ATTACH_BELLY|ATTACH_CHEST|ATTACH_CHIN|ATTACH_HEAD|ATTACH_HUD_BOTTOM|ATTACH_HUD_BOTTOM_LEFT|ATTACH_HUD_BOTTOM_RIGHT|ATTACH_HUD_CENTER_1|ATTACH_HUD_CENTER_2|ATTACH_HUD_TOP_CENTER|ATTACH_HUD_TOP_LEFT|ATTACH_HUD_TOP_RIGHT|ATTACH_LEAR|ATTACH_LEFT_PEC|ATTACH_LEYE|ATTACH_LFOOT|ATTACH_LHAND|ATTACH_LHIP|ATTACH_LLARM|ATTACH_LLLEG|ATTACH_LSHOULDER|ATTACH_LUARM|ATTACH_LULEG|ATTACH_MOUTH|ATTACH_NECK|ATTACH_NOSE|ATTACH_PELVIS|ATTACH_REAR|ATTACH_REYE|ATTACH_RFOOT|ATTACH_RHAND|ATTACH_RHIP|ATTACH_RIGHT_PEC|ATTACH_RLARM|ATTACH_RLLEG|ATTACH_RSHOULDER|ATTACH_RUARM|ATTACH_RULEG|AVOID_CHARACTERS|AVOID_DYNAMIC_OBSTACLES|AVOID_NONE|CAMERA_ACTIVE|CAMERA_BEHINDNESS_ANGLE|CAMERA_BEHINDNESS_LAG|CAMERA_DISTANCE|CAMERA_FOCUS|CAMERA_FOCUS_LAG|CAMERA_FOCUS_LOCKED|CAMERA_FOCUS_OFFSET|CAMERA_FOCUS_THRESHOLD|CAMERA_PITCH|CAMERA_POSITION|CAMERA_POSITION_LAG|CAMERA_POSITION_LOCKED|CAMERA_POSITION_THRESHOLD|CHANGED_ALLOWED_DROP|CHANGED_COLOR|CHANGED_INVENTORY|CHANGED_LINK|CHANGED_MEDIA|CHANGED_OWNER|CHANGED_REGION|CHANGED_REGION_START|CHANGED_SCALE|CHANGED_SHAPE|CHANGED_TELEPORT|CHANGED_TEXTURE|CHARACTER_ACCOUNT_FOR_SKIPPED_FRAMES|CHARACTER_AVOIDANCE_MODE|CHARACTER_CMD_JUMP|CHARACTER_CMD_SMOOTH_STOP|CHARACTER_CMD_STOP|CHARACTER_DESIRED_SPEED|CHARACTER_DESIRED_TURN_SPEED|CHARACTER_LENGTH|CHARACTER_MAX_ACCEL|CHARACTER_MAX_DECEL|CHARACTER_MAX_SPEED|CHARACTER_MAX_TURN_RADIUS|CHARACTER_ORIENTATION|CHARACTER_RADIUS|CHARACTER_STAY_WITHIN_PARCEL|CHARACTER_TYPE|CHARACTER_TYPE_A|CHARACTER_TYPE_B|CHARACTER_TYPE_C|CHARACTER_TYPE_D|CHARACTER_TYPE_NONE|CLICK_ACTION_BUY|CLICK_ACTION_NONE|CLICK_ACTION_OPEN|CLICK_ACTION_OPEN_MEDIA|CLICK_ACTION_PAY|CLICK_ACTION_PLAY|CLICK_ACTION_SIT|CLICK_ACTION_TOUCH|CONTENT_TYPE_ATOM|CONTENT_TYPE_FORM|CONTENT_TYPE_HTML|CONTENT_TYPE_JSON|CONTENT_TYPE_LLSD|CONTENT_TYPE_RSS|CONTENT_TYPE_TEXT|CONTENT_TYPE_XHTML|CONTENT_TYPE_XML|CONTROL_BACK|CONTROL_DOWN|CONTROL_FWD|CONTROL_LBUTTON|CONTROL_LEFT|CONTROL_ML_LBUTTON|CONTROL_RIGHT|CONTROL_ROT_LEFT|CONTROL_ROT_RIGHT|CONTROL_UP|DATA_BORN|DATA_NAME|DATA_ONLINE|DATA_PAYINFO|DATA_SIM_POS|DATA_SIM_RATING|DATA_SIM_STATUS|DEBUG_CHANNEL|DENSITY|ERR_GENERIC|ERR_MALFORMED_PARAMS|ERR_PARCEL_PERMISSIONS|ERR_RUNTIME_PERMISSIONS|ERR_THROTTLED|ESTATE_ACCESS_ALLOWED_AGENT_ADD|ESTATE_ACCESS_ALLOWED_AGENT_REMOVE|ESTATE_ACCESS_ALLOWED_GROUP_ADD|ESTATE_ACCESS_ALLOWED_GROUP_REMOVE|ESTATE_ACCESS_BANNED_AGENT_ADD|ESTATE_ACCESS_BANNED_AGENT_REMOVE|FALSE|FORCE_DIRECT_PATH|FRICTION|GCNP_RADIUS|GCNP_STATIC|GRAVITY_MULTIPLIER|HORIZONTAL|HTTP_BODY_MAXLENGTH|HTTP_BODY_TRUNCATED|HTTP_CUSTOM_HEADER|HTTP_METHOD|HTTP_MIMETYPE|HTTP_PRAGMA_NO_CACHE|HTTP_VERBOSE_THROTTLE|HTTP_VERIFY_CERT|INVENTORY_ALL|INVENTORY_ANIMATION|INVENTORY_BODYPART|INVENTORY_CLOTHING|INVENTORY_GESTURE|INVENTORY_LANDMARK|INVENTORY_NONE|INVENTORY_NOTECARD|INVENTORY_OBJECT|INVENTORY_SCRIPT|INVENTORY_SOUND|INVENTORY_TEXTURE|JSON_APPEND|KFM_CMD_PAUSE|KFM_CMD_PLAY|KFM_CMD_SET_MODE|KFM_CMD_STOP|KFM_COMMAND|KFM_DATA|KFM_FORWARD|KFM_LOOP|KFM_MODE|KFM_PING_PONG|KFM_REVERSE|KFM_ROTATION|KFM_TRANSLATION|LAND_LEVEL|LAND_LOWER|LAND_NOISE|LAND_RAISE|LAND_REVERT|LAND_SMOOTH|LINK_ALL_CHILDREN|LINK_ALL_OTHERS|LINK_ROOT|LINK_SET|LINK_THIS|LIST_STAT_GEOMETRIC_MEAN|LIST_STAT_MAX|LIST_STAT_MEAN|LIST_STAT_MEDIAN|LIST_STAT_MIN|LIST_STAT_NUM_COUNT|LIST_STAT_RANGE|LIST_STAT_STD_DEV|LIST_STAT_SUM|LIST_STAT_SUM_SQUARES|LOOP|MASK_BASE|MASK_EVERYONE|MASK_GROUP|MASK_NEXT|MASK_OWNER|OBJECT_ATTACHED_POINT|OBJECT_BODY_SHAPE_TYPE|OBJECT_CHARACTER_TIME|OBJECT_CLICK_ACTION|OBJECT_CREATOR|OBJECT_DESC|OBJECT_GROUP|OBJECT_HOVER_HEIGHT|OBJECT_LAST_OWNER_ID|OBJECT_NAME|OBJECT_OWNER|OBJECT_PATHFINDING_TYPE|OBJECT_PHANTOM|OBJECT_PHYSICS|OBJECT_PHYSICS_COST|OBJECT_POS|OBJECT_PRIM_EQUIVALENCE|OBJECT_RENDER_WEIGHT|OBJECT_RETURN_PARCEL|OBJECT_RETURN_PARCEL_OWNER|OBJECT_RETURN_REGION|OBJECT_ROOT|OBJECT_ROT|OBJECT_RUNNING_SCRIPT_COUNT|OBJECT_SCRIPT_MEMORY|OBJECT_SCRIPT_TIME|OBJECT_SERVER_COST|OBJECT_STREAMING_COST|OBJECT_TEMP_ON_REZ|OBJECT_TOTAL_SCRIPT_COUNT|OBJECT_UNKNOWN_DETAIL|OBJECT_VELOCITY|OPT_AVATAR|OPT_CHARACTER|OPT_EXCLUSION_VOLUME|OPT_LEGACY_LINKSET|OPT_MATERIAL_VOLUME|OPT_OTHER|OPT_STATIC_OBSTACLE|OPT_WALKABLE|PARCEL_COUNT_GROUP|PARCEL_COUNT_OTHER|PARCEL_COUNT_OWNER|PARCEL_COUNT_SELECTED|PARCEL_COUNT_TEMP|PARCEL_COUNT_TOTAL|PARCEL_DETAILS_AREA|PARCEL_DETAILS_DESC|PARCEL_DETAILS_GROUP|PARCEL_DETAILS_ID|PARCEL_DETAILS_NAME|PARCEL_DETAILS_OWNER|PARCEL_DETAILS_SEE_AVATARS|PARCEL_FLAG_ALLOW_ALL_OBJECT_ENTRY|PARCEL_FLAG_ALLOW_CREATE_GROUP_OBJECTS|PARCEL_FLAG_ALLOW_CREATE_OBJECTS|PARCEL_FLAG_ALLOW_DAMAGE|PARCEL_FLAG_ALLOW_FLY|PARCEL_FLAG_ALLOW_GROUP_OBJECT_ENTRY|PARCEL_FLAG_ALLOW_GROUP_SCRIPTS|PARCEL_FLAG_ALLOW_LANDMARK|PARCEL_FLAG_ALLOW_SCRIPTS|PARCEL_FLAG_ALLOW_TERRAFORM|PARCEL_FLAG_LOCAL_SOUND_ONLY|PARCEL_FLAG_RESTRICT_PUSHOBJECT|PARCEL_FLAG_USE_ACCESS_GROUP|PARCEL_FLAG_USE_ACCESS_LIST|PARCEL_FLAG_USE_BAN_LIST|PARCEL_FLAG_USE_LAND_PASS_LIST|PARCEL_MEDIA_COMMAND_AGENT|PARCEL_MEDIA_COMMAND_AUTO_ALIGN|PARCEL_MEDIA_COMMAND_DESC|PARCEL_MEDIA_COMMAND_LOOP|PARCEL_MEDIA_COMMAND_LOOP_SET|PARCEL_MEDIA_COMMAND_PAUSE|PARCEL_MEDIA_COMMAND_PLAY|PARCEL_MEDIA_COMMAND_SIZE|PARCEL_MEDIA_COMMAND_STOP|PARCEL_MEDIA_COMMAND_TEXTURE|PARCEL_MEDIA_COMMAND_TIME|PARCEL_MEDIA_COMMAND_TYPE|PARCEL_MEDIA_COMMAND_UNLOAD|PARCEL_MEDIA_COMMAND_URL|PASS_ALWAYS|PASS_IF_NOT_HANDLED|PASS_NEVER|PASSIVE|PATROL_PAUSE_AT_WAYPOINTS|PAYMENT_INFO_ON_FILE|PAYMENT_INFO_USED|PAY_DEFAULT|PAY_HIDE|PERMISSION_ATTACH|PERMISSION_CHANGE_LINKS|PERMISSION_CONTROL_CAMERA|PERMISSION_DEBIT|PERMISSION_OVERRIDE_ANIMATIONS|PERMISSION_RETURN_OBJECTS|PERMISSION_SILENT_ESTATE_MANAGEMENT|PERMISSION_TAKE_CONTROLS|PERMISSION_TELEPORT|PERMISSION_TRACK_CAMERA|PERMISSION_TRIGGER_ANIMATION|PERM_ALL|PERM_COPY|PERM_MODIFY|PERM_MOVE|PERM_TRANSFER|PING_PONG|PRIM_ALPHA_MODE|PRIM_ALPHA_MODE_BLEND|PRIM_ALPHA_MODE_EMISSIVE|PRIM_ALPHA_MODE_MASK|PRIM_ALPHA_MODE_NONE|PRIM_BUMP_BARK|PRIM_BUMP_BLOBS|PRIM_BUMP_BRICKS|PRIM_BUMP_BRIGHT|PRIM_BUMP_CHECKER|PRIM_BUMP_CONCRETE|PRIM_BUMP_DARK|PRIM_BUMP_DISKS|PRIM_BUMP_GRAVEL|PRIM_BUMP_LARGETILE|PRIM_BUMP_NONE|PRIM_BUMP_SHINY|PRIM_BUMP_SIDING|PRIM_BUMP_STONE|PRIM_BUMP_STUCCO|PRIM_BUMP_SUCTION|PRIM_BUMP_TILE|PRIM_BUMP_WEAVE|PRIM_BUMP_WOOD|PRIM_COLOR|PRIM_DESC|PRIM_FLEXIBLE|PRIM_FULLBRIGHT|PRIM_GLOW|PRIM_HOLE_CIRCLE|PRIM_HOLE_DEFAULT|PRIM_HOLE_SQUARE|PRIM_HOLE_TRIANGLE|PRIM_LINK_TARGET|PRIM_MATERIAL|PRIM_MATERIAL_FLESH|PRIM_MATERIAL_GLASS|PRIM_MATERIAL_METAL|PRIM_MATERIAL_PLASTIC|PRIM_MATERIAL_RUBBER|PRIM_MATERIAL_STONE|PRIM_MATERIAL_WOOD|PRIM_MEDIA_ALT_IMAGE_ENABLE|PRIM_MEDIA_AUTO_LOOP|PRIM_MEDIA_AUTO_PLAY|PRIM_MEDIA_AUTO_SCALE|PRIM_MEDIA_AUTO_ZOOM|PRIM_MEDIA_CONTROLS|PRIM_MEDIA_CONTROLS_MINI|PRIM_MEDIA_CONTROLS_STANDARD|PRIM_MEDIA_CURRENT_URL|PRIM_MEDIA_FIRST_CLICK_INTERACT|PRIM_MEDIA_HEIGHT_PIXELS|PRIM_MEDIA_HOME_URL|PRIM_MEDIA_MAX_HEIGHT_PIXELS|PRIM_MEDIA_MAX_URL_LENGTH|PRIM_MEDIA_MAX_WHITELIST_COUNT|PRIM_MEDIA_MAX_WHITELIST_SIZE|PRIM_MEDIA_MAX_WIDTH_PIXELS|PRIM_MEDIA_PARAM_MAX|PRIM_MEDIA_PERMS_CONTROL|PRIM_MEDIA_PERMS_INTERACT|PRIM_MEDIA_PERM_ANYONE|PRIM_MEDIA_PERM_GROUP|PRIM_MEDIA_PERM_NONE|PRIM_MEDIA_PERM_OWNER|PRIM_MEDIA_WHITELIST|PRIM_MEDIA_WHITELIST_ENABLE|PRIM_MEDIA_WIDTH_PIXELS|PRIM_NAME|PRIM_NORMAL|PRIM_OMEGA|PRIM_PHANTOM|PRIM_PHYSICS|PRIM_PHYSICS_SHAPE_CONVEX|PRIM_PHYSICS_SHAPE_NONE|PRIM_PHYSICS_SHAPE_PRIM|PRIM_PHYSICS_SHAPE_TYPE|PRIM_POINT_LIGHT|PRIM_POSITION|PRIM_POS_LOCAL|PRIM_ROTATION|PRIM_ROT_LOCAL|PRIM_SCULPT_FLAG_INVERT|PRIM_SCULPT_FLAG_MIRROR|PRIM_SCULPT_TYPE_CYLINDER|PRIM_SCULPT_TYPE_MASK|PRIM_SCULPT_TYPE_PLANE|PRIM_SCULPT_TYPE_SPHERE|PRIM_SCULPT_TYPE_TORUS|PRIM_SHINY_HIGH|PRIM_SHINY_LOW|PRIM_SHINY_MEDIUM|PRIM_SHINY_NONE|PRIM_SIZE|PRIM_SLICE|PRIM_SPECULAR|PRIM_TEMP_ON_REZ|PRIM_TEXGEN|PRIM_TEXGEN_DEFAULT|PRIM_TEXGEN_PLANAR|PRIM_TEXT|PRIM_TEXTURE|PRIM_TYPE|PRIM_TYPE_BOX|PRIM_TYPE_CYLINDER|PRIM_TYPE_PRISM|PRIM_TYPE_RING|PRIM_TYPE_SCULPT|PRIM_TYPE_SPHERE|PRIM_TYPE_TORUS|PRIM_TYPE_TUBE|PROFILE_NONE|PROFILE_SCRIPT_MEMORY|PSYS_PART_BF_DEST_COLOR|PSYS_PART_BF_ONE|PSYS_PART_BF_ONE_MINUS_DEST_COLOR|PSYS_PART_BF_ONE_MINUS_SOURCE_ALPHA|PSYS_PART_BF_ONE_MINUS_SOURCE_COLOR|PSYS_PART_BF_SOURCE_ALPHA|PSYS_PART_BF_SOURCE_COLOR|PSYS_PART_BF_ZERO|PSYS_PART_BLEND_FUNC_DEST|PSYS_PART_BLEND_FUNC_SOURCE|PSYS_PART_BOUNCE_MASK|PSYS_PART_EMISSIVE_MASK|PSYS_PART_END_ALPHA|PSYS_PART_END_COLOR|PSYS_PART_END_GLOW|PSYS_PART_END_SCALE|PSYS_PART_FLAGS|PSYS_PART_FOLLOW_SRC_MASK|PSYS_PART_FOLLOW_VELOCITY_MASK|PSYS_PART_INTERP_COLOR_MASK|PSYS_PART_INTERP_SCALE_MASK|PSYS_PART_MAX_AGE|PSYS_PART_RIBBON_MASK|PSYS_PART_START_ALPHA|PSYS_PART_START_COLOR|PSYS_PART_START_GLOW|PSYS_PART_START_SCALE|PSYS_PART_TARGET_LINEAR_MASK|PSYS_PART_TARGET_POS_MASK|PSYS_PART_WIND_MASK|PSYS_SRC_ACCEL|PSYS_SRC_ANGLE_BEGIN|PSYS_SRC_ANGLE_END|PSYS_SRC_BURST_PART_COUNT|PSYS_SRC_BURST_RADIUS|PSYS_SRC_BURST_RATE|PSYS_SRC_BURST_SPEED_MAX|PSYS_SRC_BURST_SPEED_MIN|PSYS_SRC_MAX_AGE|PSYS_SRC_OMEGA|PSYS_SRC_PATTERN|PSYS_SRC_PATTERN_ANGLE|PSYS_SRC_PATTERN_ANGLE_CONE|PSYS_SRC_PATTERN_ANGLE_CONE_EMPTY|PSYS_SRC_PATTERN_DROP|PSYS_SRC_PATTERN_EXPLODE|PSYS_SRC_TARGET_KEY|PSYS_SRC_TEXTURE|PUBLIC_CHANNEL|PURSUIT_FUZZ_FACTOR|PURSUIT_GOAL_TOLERANCE|PURSUIT_INTERCEPT|PURSUIT_OFFSET|PU_EVADE_HIDDEN|PU_EVADE_SPOTTED|PU_FAILURE_DYNAMIC_PATHFINDING_DISABLED|PU_FAILURE_INVALID_GOAL|PU_FAILURE_INVALID_START|PU_FAILURE_NO_NAVMESH|PU_FAILURE_NO_VALID_DESTINATION|PU_FAILURE_OTHER|PU_FAILURE_PARCEL_UNREACHABLE|PU_FAILURE_TARGET_GONE|PU_FAILURE_UNREACHABLE|PU_GOAL_REACHED|PU_SLOWDOWN_DISTANCE_REACHED|RCERR_CAST_TIME_EXCEEDED|RCERR_SIM_PERF_LOW|RCERR_UNKNOWN|RC_DATA_FLAGS|RC_DETECT_PHANTOM|RC_GET_LINK_NUM|RC_GET_NORMAL|RC_GET_ROOT_KEY|RC_MAX_HITS|RC_REJECT_AGENTS|RC_REJECT_LAND|RC_REJECT_NONPHYSICAL|RC_REJECT_PHYSICAL|RC_REJECT_TYPES|REGION_FLAG_ALLOW_DAMAGE|REGION_FLAG_ALLOW_DIRECT_TELEPORT|REGION_FLAG_BLOCK_FLY|REGION_FLAG_BLOCK_TERRAFORM|REGION_FLAG_DISABLE_COLLISIONS|REGION_FLAG_DISABLE_PHYSICS|REGION_FLAG_FIXED_SUN|REGION_FLAG_RESTRICT_PUSHOBJECT|REGION_FLAG_SANDBOX|REMOTE_DATA_CHANNEL|REMOTE_DATA_REPLY|REMOTE_DATA_REQUEST|REQUIRE_LINE_OF_SIGHT|RESTITUTION|REVERSE|ROTATE|SCALE|SCRIPTED|SIM_STAT_PCT_CHARS_STEPPED|SMOOTH|STATUS_BLOCK_GRAB|STATUS_BLOCK_GRAB_OBJECT|STATUS_BOUNDS_ERROR|STATUS_CAST_SHADOWS|STATUS_DIE_AT_EDGE|STATUS_INTERNAL_ERROR|STATUS_MALFORMED_PARAMS|STATUS_NOT_FOUND|STATUS_NOT_SUPPORTED|STATUS_OK|STATUS_PHANTOM|STATUS_PHYSICS|STATUS_RETURN_AT_EDGE|STATUS_ROTATE_X|STATUS_ROTATE_Y|STATUS_ROTATE_Z|STATUS_SANDBOX|STATUS_TYPE_MISMATCH|STATUS_WHITELIST_FAILED|STRING_TRIM|STRING_TRIM_HEAD|STRING_TRIM_TAIL|TOUCH_INVALID_FACE|TRAVERSAL_TYPE|TRAVERSAL_TYPE_FAST|TRAVERSAL_TYPE_NONE|TRAVERSAL_TYPE_SLOW|TRUE|TYPE_FLOAT|TYPE_INTEGER|TYPE_INVALID|TYPE_KEY|TYPE_ROTATION|TYPE_STRING|TYPE_VECTOR|VEHICLE_ANGULAR_DEFLECTION_EFFICIENCY|VEHICLE_ANGULAR_DEFLECTION_TIMESCALE|VEHICLE_ANGULAR_FRICTION_TIMESCALE|VEHICLE_ANGULAR_MOTOR_DECAY_TIMESCALE|VEHICLE_ANGULAR_MOTOR_DIRECTION|VEHICLE_ANGULAR_MOTOR_TIMESCALE|VEHICLE_BANKING_EFFICIENCY|VEHICLE_BANKING_MIX|VEHICLE_BANKING_TIMESCALE|VEHICLE_BUOYANCY|VEHICLE_FLAG_CAMERA_DECOUPLED|VEHICLE_FLAG_HOVER_GLOBAL_HEIGHT|VEHICLE_FLAG_HOVER_TERRAIN_ONLY|VEHICLE_FLAG_HOVER_UP_ONLY|VEHICLE_FLAG_HOVER_WATER_ONLY|VEHICLE_FLAG_LIMIT_MOTOR_UP|VEHICLE_FLAG_LIMIT_ROLL_ONLY|VEHICLE_FLAG_MOUSELOOK_BANK|VEHICLE_FLAG_MOUSELOOK_STEER|VEHICLE_FLAG_NO_DEFLECTION_UP|VEHICLE_HOVER_EFFICIENCY|VEHICLE_HOVER_HEIGHT|VEHICLE_HOVER_TIMESCALE|VEHICLE_LINEAR_DEFLECTION_EFFICIENCY|VEHICLE_LINEAR_DEFLECTION_TIMESCALE|VEHICLE_LINEAR_FRICTION_TIMESCALE|VEHICLE_LINEAR_MOTOR_DECAY_TIMESCALE|VEHICLE_LINEAR_MOTOR_DIRECTION|VEHICLE_LINEAR_MOTOR_OFFSET|VEHICLE_LINEAR_MOTOR_TIMESCALE|VEHICLE_REFERENCE_FRAME|VEHICLE_TYPE_AIRPLANE|VEHICLE_TYPE_BALLOON|VEHICLE_TYPE_BOAT|VEHICLE_TYPE_CAR|VEHICLE_TYPE_NONE|VEHICLE_TYPE_SLED|VEHICLE_VERTICAL_ATTRACTION_EFFICIENCY|VEHICLE_VERTICAL_ATTRACTION_TIMESCALE|VERTICAL|WANDER_PAUSE_AT_WAYPOINTS|XP_ERROR_EXPERIENCES_DISABLED|XP_ERROR_EXPERIENCE_DISABLED|XP_ERROR_EXPERIENCE_SUSPENDED|XP_ERROR_INVALID_EXPERIENCE|XP_ERROR_INVALID_PARAMETERS|XP_ERROR_KEY_NOT_FOUND|XP_ERROR_MATURITY_EXCEEDED|XP_ERROR_NONE|XP_ERROR_NOT_FOUND|XP_ERROR_NOT_PERMITTED|XP_ERROR_NO_EXPERIENCE|XP_ERROR_QUOTA_EXCEEDED|XP_ERROR_RETRY_UPDATE|XP_ERROR_STORAGE_EXCEPTION|XP_ERROR_STORE_DISABLED|XP_ERROR_THROTTLED|XP_ERROR_UNKNOWN_ERROR",
      "constant.language.integer.boolean.lsl": "FALSE|TRUE",
      "constant.language.quaternion.lsl": "ZERO_ROTATION",
      "constant.language.string.lsl": "EOF|JSON_ARRAY|JSON_DELETE|JSON_FALSE|JSON_INVALID|JSON_NULL|JSON_NUMBER|JSON_OBJECT|JSON_STRING|JSON_TRUE|NULL_KEY|TEXTURE_BLANK|TEXTURE_DEFAULT|TEXTURE_MEDIA|TEXTURE_PLYWOOD|TEXTURE_TRANSPARENT|URL_REQUEST_DENIED|URL_REQUEST_GRANTED",
      "constant.language.vector.lsl": "TOUCH_INVALID_TEXCOORD|TOUCH_INVALID_VECTOR|ZERO_VECTOR",
      "invalid.broken.lsl": "LAND_LARGE_BRUSH|LAND_MEDIUM_BRUSH|LAND_SMALL_BRUSH",
      "invalid.deprecated.lsl": "ATTACH_LPEC|ATTACH_RPEC|DATA_RATING|OBJECT_ATTACHMENT_GEOMETRY_BYTES|OBJECT_ATTACHMENT_SURFACE_AREA|PRIM_CAST_SHADOWS|PRIM_MATERIAL_LIGHT|PRIM_TYPE_LEGACY|PSYS_SRC_INNERANGLE|PSYS_SRC_OUTERANGLE|VEHICLE_FLAG_NO_FLY_UP|llClearExperiencePermissions|llCloud|llGetExperienceList|llMakeExplosion|llMakeFire|llMakeFountain|llMakeSmoke|llRemoteDataSetRegion|llSound|llSoundPreload|llXorBase64Strings|llXorBase64StringsCorrect",
      "invalid.illegal.lsl": "event",
      "invalid.unimplemented.lsl": "CHARACTER_MAX_ANGULAR_ACCEL|CHARACTER_MAX_ANGULAR_SPEED|CHARACTER_TURN_SPEED_MULTIPLIER|PERMISSION_CHANGE_JOINTS|PERMISSION_CHANGE_PERMISSIONS|PERMISSION_EXPERIENCE|PERMISSION_RELEASE_OWNERSHIP|PERMISSION_REMAP_CONTROLS|PRIM_PHYSICS_MATERIAL|PSYS_SRC_OBJ_REL_MASK|llCollisionSprite|llPointAt|llRefreshPrimURL|llReleaseCamera|llRemoteLoadScript|llSetPrimURL|llStopPointAt|llTakeCamera",
      "reserved.godmode.lsl": "llGodLikeRezObject|llSetInventoryPermMask|llSetObjectPermMask",
      "reserved.log.lsl": "print",
      "keyword.control.lsl": "do|else|for|if|jump|return|while",
      "storage.type.lsl": "float|integer|key|list|quaternion|rotation|string|vector",
      "support.function.lsl": "llAbs|llAcos|llAddToLandBanList|llAddToLandPassList|llAdjustSoundVolume|llAgentInExperience|llAllowInventoryDrop|llAngleBetween|llApplyImpulse|llApplyRotationalImpulse|llAsin|llAtan2|llAttachToAvatar|llAttachToAvatarTemp|llAvatarOnLinkSitTarget|llAvatarOnSitTarget|llAxes2Rot|llAxisAngle2Rot|llBase64ToInteger|llBase64ToString|llBreakAllLinks|llBreakLink|llCSV2List|llCastRay|llCeil|llClearCameraParams|llClearLinkMedia|llClearPrimMedia|llCloseRemoteDataChannel|llCollisionFilter|llCollisionSound|llCos|llCreateCharacter|llCreateKeyValue|llCreateLink|llDataSizeKeyValue|llDeleteCharacter|llDeleteKeyValue|llDeleteSubList|llDeleteSubString|llDetachFromAvatar|llDetectedGrab|llDetectedGroup|llDetectedKey|llDetectedLinkNumber|llDetectedName|llDetectedOwner|llDetectedPos|llDetectedRot|llDetectedTouchBinormal|llDetectedTouchFace|llDetectedTouchNormal|llDetectedTouchPos|llDetectedTouchST|llDetectedTouchUV|llDetectedType|llDetectedVel|llDialog|llDie|llDumpList2String|llEdgeOfWorld|llEjectFromLand|llEmail|llEscapeURL|llEuler2Rot|llEvade|llExecCharacterCmd|llFabs|llFleeFrom|llFloor|llForceMouselook|llFrand|llGenerateKey|llGetAccel|llGetAgentInfo|llGetAgentLanguage|llGetAgentList|llGetAgentSize|llGetAlpha|llGetAndResetTime|llGetAnimation|llGetAnimationList|llGetAnimationOverride|llGetAttached|llGetAttachedList|llGetBoundingBox|llGetCameraPos|llGetCameraRot|llGetCenterOfMass|llGetClosestNavPoint|llGetColor|llGetCreator|llGetDate|llGetDisplayName|llGetEnergy|llGetEnv|llGetExperienceDetails|llGetExperienceErrorMessage|llGetForce|llGetFreeMemory|llGetFreeURLs|llGetGMTclock|llGetGeometricCenter|llGetHTTPHeader|llGetInventoryCreator|llGetInventoryKey|llGetInventoryName|llGetInventoryNumber|llGetInventoryPermMask|llGetInventoryType|llGetKey|llGetLandOwnerAt|llGetLinkKey|llGetLinkMedia|llGetLinkName|llGetLinkNumber|llGetLinkNumberOfSides|llGetLinkPrimitiveParams|llGetListEntryType|llGetListLength|llGetLocalPos|llGetLocalRot|llGetMass|llGetMassMKS|llGetMaxScaleFactor|llGetMemoryLimit|llGetMinScaleFactor|llGetNextEmail|llGetNotecardLine|llGetNumberOfNotecardLines|llGetNumberOfPrims|llGetNumberOfSides|llGetObjectDesc|llGetObjectDetails|llGetObjectMass|llGetObjectName|llGetObjectPermMask|llGetObjectPrimCount|llGetOmega|llGetOwner|llGetOwnerKey|llGetParcelDetails|llGetParcelFlags|llGetParcelMaxPrims|llGetParcelMusicURL|llGetParcelPrimCount|llGetParcelPrimOwners|llGetPermissions|llGetPermissionsKey|llGetPhysicsMaterial|llGetPos|llGetPrimMediaParams|llGetPrimitiveParams|llGetRegionAgentCount|llGetRegionCorner|llGetRegionFPS|llGetRegionFlags|llGetRegionName|llGetRegionTimeDilation|llGetRootPosition|llGetRootRotation|llGetRot|llGetSPMaxMemory|llGetScale|llGetScriptName|llGetScriptState|llGetSimStats|llGetSimulatorHostname|llGetStartParameter|llGetStaticPath|llGetStatus|llGetSubString|llGetSunDirection|llGetTexture|llGetTextureOffset|llGetTextureRot|llGetTextureScale|llGetTime|llGetTimeOfDay|llGetTimestamp|llGetTorque|llGetUnixTime|llGetUsedMemory|llGetUsername|llGetVel|llGetWallclock|llGiveInventory|llGiveInventoryList|llGiveMoney|llGround|llGroundContour|llGroundNormal|llGroundRepel|llGroundSlope|llHTTPRequest|llHTTPResponse|llInsertString|llInstantMessage|llIntegerToBase64|llJson2List|llJsonGetValue|llJsonSetValue|llJsonValueType|llKey2Name|llKeyCountKeyValue|llKeysKeyValue|llLinkParticleSystem|llLinkSitTarget|llList2CSV|llList2Float|llList2Integer|llList2Json|llList2Key|llList2List|llList2ListStrided|llList2Rot|llList2String|llList2Vector|llListFindList|llListInsertList|llListRandomize|llListReplaceList|llListSort|llListStatistics|llListen|llListenControl|llListenRemove|llLoadURL|llLog|llLog10|llLookAt|llLoopSound|llLoopSoundMaster|llLoopSoundSlave|llMD5String|llManageEstateAccess|llMapDestination|llMessageLinked|llMinEventDelay|llModPow|llModifyLand|llMoveToTarget|llNavigateTo|llOffsetTexture|llOpenRemoteDataChannel|llOverMyLand|llOwnerSay|llParcelMediaCommandList|llParcelMediaQuery|llParseString2List|llParseStringKeepNulls|llParticleSystem|llPassCollisions|llPassTouches|llPatrolPoints|llPlaySound|llPlaySoundSlave|llPow|llPreloadSound|llPursue|llPushObject|llReadKeyValue|llRegionSay|llRegionSayTo|llReleaseControls|llReleaseURL|llRemoteDataReply|llRemoteLoadScriptPin|llRemoveFromLandBanList|llRemoveFromLandPassList|llRemoveInventory|llRemoveVehicleFlags|llRequestAgentData|llRequestDisplayName|llRequestExperiencePermissions|llRequestInventoryData|llRequestPermissions|llRequestSecureURL|llRequestSimulatorData|llRequestURL|llRequestUsername|llResetAnimationOverride|llResetLandBanList|llResetLandPassList|llResetOtherScript|llResetScript|llResetTime|llReturnObjectsByID|llReturnObjectsByOwner|llRezAtRoot|llRezObject|llRot2Angle|llRot2Axis|llRot2Euler|llRot2Fwd|llRot2Left|llRot2Up|llRotBetween|llRotLookAt|llRotTarget|llRotTargetRemove|llRotateTexture|llRound|llSHA1String|llSameGroup|llSay|llScaleByFactor|llScaleTexture|llScriptDanger|llScriptProfiler|llSendRemoteData|llSensor|llSensorRemove|llSensorRepeat|llSetAlpha|llSetAngularVelocity|llSetAnimationOverride|llSetBuoyancy|llSetCameraAtOffset|llSetCameraEyeOffset|llSetCameraParams|llSetClickAction|llSetColor|llSetContentType|llSetDamage|llSetForce|llSetForceAndTorque|llSetHoverHeight|llSetKeyframedMotion|llSetLinkAlpha|llSetLinkCamera|llSetLinkColor|llSetLinkMedia|llSetLinkPrimitiveParams|llSetLinkPrimitiveParamsFast|llSetLinkTexture|llSetLinkTextureAnim|llSetLocalRot|llSetMemoryLimit|llSetObjectDesc|llSetObjectName|llSetParcelMusicURL|llSetPayPrice|llSetPhysicsMaterial|llSetPos|llSetPrimMediaParams|llSetPrimitiveParams|llSetRegionPos|llSetRemoteScriptAccessPin|llSetRot|llSetScale|llSetScriptState|llSetSitText|llSetSoundQueueing|llSetSoundRadius|llSetStatus|llSetText|llSetTexture|llSetTextureAnim|llSetTimerEvent|llSetTorque|llSetTouchText|llSetVehicleFlags|llSetVehicleFloatParam|llSetVehicleRotationParam|llSetVehicleType|llSetVehicleVectorParam|llSetVelocity|llShout|llSin|llSitTarget|llSleep|llSqrt|llStartAnimation|llStopAnimation|llStopHover|llStopLookAt|llStopMoveToTarget|llStopSound|llStringLength|llStringToBase64|llStringTrim|llSubStringIndex|llTakeControls|llTan|llTarget|llTargetOmega|llTargetRemove|llTeleportAgent|llTeleportAgentGlobalCoords|llTeleportAgentHome|llTextBox|llToLower|llToUpper|llTransferLindenDollars|llTriggerSound|llTriggerSoundLimited|llUnSit|llUnescapeURL|llUpdateCharacter|llUpdateKeyValue|llVecDist|llVecMag|llVecNorm|llVolumeDetect|llWanderWithin|llWater|llWhisper|llWind|llXorBase64",
      "support.function.event.lsl": "at_rot_target|at_target|attach|changed|collision|collision_end|collision_start|control|dataserver|email|experience_permissions|experience_permissions_denied|http_request|http_response|land_collision|land_collision_end|land_collision_start|link_message|listen|money|moving_end|moving_start|no_sensor|not_at_rot_target|not_at_target|object_rez|on_rez|path_update|remote_data|run_time_permissions|sensor|state_entry|state_exit|timer|touch|touch_end|touch_start|transaction_result"
    }, "identifier");
    this.$rules = {
      start: [{
        token: "comment.line.double-slash.lsl",
        regex: "\\/\\/.*$"
      }, {token: "comment.block.begin.lsl", regex: "\\/\\*", next: "comment"}, {
        token: "string.quoted.double.lsl",
        start: '"',
        end: '"',
        next: [{token: "constant.character.escape.lsl", regex: /\\[tn"\\]/}]
      }, {
        token: "constant.numeric.lsl",
        regex: "(0[xX][0-9a-fA-F]+|[+-]?[0-9]+(?:(?:\\.[0-9]*)?(?:[eE][+-]?[0-9]+)?)?)\\b"
      }, {token: "entity.name.state.lsl", regex: "\\b((state)\\s+[A-Za-z_]\\w*|default)\\b"}, {
        token: e,
        regex: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b"
      }, {
        token: "support.function.user-defined.lsl",
        regex: /\b([a-zA-Z_]\w*)(?=\(.*?\))/
      }, {
        token: "keyword.operator.lsl",
        regex: "\\+\\+|\\-\\-|<<|>>|&&?|\\|\\|?|\\^|~|[!%<>=*+\\-\\/]=?"
      }, {token: "invalid.illegal.keyword.operator.lsl", regex: ":=?"}, {
        token: "punctuation.operator.lsl",
        regex: "\\,|\\;"
      }, {token: "paren.lparen.lsl", regex: "[\\[\\(\\{]"}, {
        token: "paren.rparen.lsl",
        regex: "[\\]\\)\\}]"
      }, {token: "text.lsl", regex: "\\s+"}],
      comment: [{token: "comment.block.end.lsl", regex: "\\*\\/", next: "start"}, {defaultToken: "comment.block.lsl"}]
    }, this.normalizeRules()
  }

  var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules;
  r.inherits(s, i), t.LSLHighlightRules = s
}), define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
  "use strict";
  var r = e("../range").Range, i = function () {
  };
  (function () {
    this.checkOutdent = function (e, t) {
      return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
    }, this.autoOutdent = function (e, t) {
      var n = e.getLine(t), i = n.match(/^(\s*\})/);
      if (!i) return 0;
      var s = i[1].length, o = e.findMatchingBracket({row: t, column: s});
      if (!o || o.row == t) return 0;
      var u = this.$getIndent(e.getLine(o.row));
      e.replace(new r(t, 0, t, s - 1), u)
    }, this.$getIndent = function (e) {
      return e.match(/^\s*/)[0]
    }
  }).call(i.prototype), t.MatchingBraceOutdent = i
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
  "use strict";
  var r = e("../../lib/oop"), i = e("../../range").Range, s = e("./fold_mode").FoldMode, o = t.FoldMode = function (e) {
    e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
  };
  r.inherits(o, s), function () {
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, n) {
      var r = e.getLine(n);
      if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r)) return "";
      var i = this._getFoldWidgetBase(e, t, n);
      return !i && this.startRegionRe.test(r) ? "start" : i
    }, this.getFoldWidgetRange = function (e, t, n, r) {
      var i = e.getLine(n);
      if (this.startRegionRe.test(i)) return this.getCommentRegionBlock(e, i, n);
      var s = i.match(this.foldingStartMarker);
      if (s) {
        var o = s.index;
        if (s[1]) return this.openingBracketBlock(e, s[1], n, o);
        var u = e.getCommentFoldRange(n, o + s[0].length, 1);
        return u && !u.isMultiLine() && (r ? u = this.getSectionRange(e, n) : t != "all" && (u = null)), u
      }
      if (t === "markbegin") return;
      var s = i.match(this.foldingStopMarker);
      if (s) {
        var o = s.index + s[0].length;
        return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1)
      }
    }, this.getSectionRange = function (e, t) {
      var n = e.getLine(t), r = n.search(/\S/), s = t, o = n.length;
      t += 1;
      var u = t, a = e.getLength();
      while (++t < a) {
        n = e.getLine(t);
        var f = n.search(/\S/);
        if (f === -1) continue;
        if (r > f) break;
        var l = this.getFoldWidgetRange(e, "all", t);
        if (l) {
          if (l.start.row <= s) break;
          if (l.isMultiLine()) t = l.end.row; else if (r == f) break
        }
        u = t
      }
      return new i(s, o, u, e.getLine(u).length)
    }, this.getCommentRegionBlock = function (e, t, n) {
      var r = t.search(/\s*$/), s = e.getLength(), o = n, u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/, a = 1;
      while (++n < s) {
        t = e.getLine(n);
        var f = u.exec(t);
        if (!f) continue;
        f[1] ? a-- : a++;
        if (!a) break
      }
      var l = n;
      if (l > o) return new i(o, r, l, t.length)
    }
  }.call(o.prototype)
}), define("ace/mode/lsl", ["require", "exports", "module", "ace/mode/lsl_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/mode/text", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle", "ace/lib/oop"], function (e, t, n) {
  "use strict";
  var r = e("./lsl_highlight_rules").LSLHighlightRules, i = e("./matching_brace_outdent").MatchingBraceOutdent,
    s = e("../range").Range, o = e("./text").Mode, u = e("./behaviour/cstyle").CstyleBehaviour,
    a = e("./folding/cstyle").FoldMode, f = e("../lib/oop"), l = function () {
      this.HighlightRules = r, this.$outdent = new i, this.$behaviour = new u, this.foldingRules = new a
    };
  f.inherits(l, o), function () {
    this.lineCommentStart = ["//"], this.blockComment = {
      start: "/*",
      end: "*/"
    }, this.getNextLineIndent = function (e, t, n) {
      var r = this.$getIndent(t), i = this.getTokenizer().getLineTokens(t, e), s = i.tokens, o = i.state;
      if (s.length && s[s.length - 1].type === "comment.block.lsl") return r;
      if (e === "start") {
        var u = t.match(/^.*[\{\(\[]\s*$/);
        u && (r += n)
      }
      return r
    }, this.checkOutdent = function (e, t, n) {
      return this.$outdent.checkOutdent(t, n)
    }, this.autoOutdent = function (e, t, n) {
      this.$outdent.autoOutdent(t, n)
    }, this.$id = "ace/mode/lsl"
  }.call(l.prototype), t.Mode = l
});
(function () {
  window.require(["ace/mode/lsl"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();